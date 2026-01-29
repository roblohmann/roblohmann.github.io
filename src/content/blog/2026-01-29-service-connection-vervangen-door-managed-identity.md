---
title: "Azure Kubernetes: Van Service Principal naar Managed Identity"
description: "Twee methoden om de waarschuwing over verlopen Service Principal secrets in AKS op te lossen: migreren naar Managed Identity of het secret vernieuwen."
pubDate: 2026-01-29T13:15:00+01:00
isPublished: false
tags: ["kubernetes", "aks", "azure", "security"]
---

Wanneer je een Azure Kubernetes Service (AKS) cluster beheert, kun je de waarschuwing tegenkomen dat je Service Principal secret bijna  (of misschien al wel verlopen is). Dit is een bekend probleem bij oudere AKS-clusters die nog gebruikmaken van Service Principals in plaats van Managed Identities.

In deze blog beschrijf ik twee oplossingen: het migreren naar een Managed Identity (aanbevolen) of het vernieuwen van het Service Principal secret.

## Stap 1: Controleer welke authenticatiemethode wordt gebruikt

Voordat je begint, is het belangrijk om te controleren welke authenticatiemethode je AKS-cluster momenteel gebruikt:

```bash
az aks show -g <resource-group> -n <aks-name> --query identity
```

Als dit commando geen resultaat geeft, gebruikt je cluster een Service Principal. Dit is het oude authenticatiemodel dat Microsoft inmiddels afraadt.

## Optie A: Migreren naar Managed Identity (aanbevolen)

De beste en meest toekomstbestendige oplossing is om over te stappen naar een Managed Identity. Dit is met één commando te realiseren:

```bash
az aks update -g <resource-group> -n <aks-name> --enable-managed-identity
```

Dit commando migreert je cluster automatisch naar een Managed Identity. Nadat het commando is uitgevoerd op het betreffende cluster en het proces klaar is, verdwijnt de waarschuwing over het verlopende secret.

### Voordelen van Managed Identity

- **Geen secrets meer die kunnen verlopen**: Azure beheert de credentials automatisch
- **Best practice**: Dit is de door Microsoft aanbevolen methode voor authenticatie
- **Minder beheeroverhead**: Geen handmatige rotatie van secrets meer nodig
- **Verbeterde beveiliging**: Credentials worden niet meer extern opgeslagen

## Optie B: Service Principal secret vernieuwen

Als migratie naar Managed Identity nu niet mogelijk is (bijvoorbeeld door technische beperkingen), kun je het secret van de Service Principal vernieuwen. Dit is een tijdelijke oplossing, want het secret heeft een beperkte geldigheid. Als deze verloopt, zul je deze stappen opnieuw moeten herhalen.

### Stap 1: Service Principal opzoeken

Zoek eerst de Client ID van de huidige Service Principal op:

```bash
az aks show -g <resource-group> -n <aks-name> --query servicePrincipalProfile.clientId
```

Noteer de Client ID die je te zien krijgt in de Azure CLI.

### Stap 2: Nieuw secret genereren

Genereer een nieuw secret voor de Service Principal:

```bash
az ad sp credential reset --name <client-id-uit-stap-1>
```

Dit commando retourneert een nieuw secret. Noteer deze ergens, je hebt hem bij stap 3 nodig!

### Stap 3: AKS-cluster updaten

Update het AKS-cluster met het nieuwe secret:

```bash
az aks update-credentials \
  --resource-group <resource-group> \
  --name <aks-name> \
  --reset-service-principal \
  --service-principal <client-id> \
  --client-secret <new-secret>
```

Na het uitvoeren van dit commando is de waarschuwing opgelost en heeft je cluster weer een geldig secret.

## Waarom is dit belangrijk voor de security van je cluster?

Een verlopen of zwak beveiligd Service Principal secret vormt een direct security risico voor je AKS-cluster. Hier zijn de belangrijkste redenen waarom je dit serieus moet nemen:

### Toegangscontrole en authenticatie

Het Service Principal of Managed Identity is de identiteit waarmee je AKS-cluster zich authenticeert bij Azure-resources. Als het secret verloopt of gecompromitteerd raakt:

- **Verlies van toegang**: Je cluster kan geen verbinding meer maken met essentiële Azure-diensten zoals Azure Container Registry (ACR), Azure Key Vault, of Azure Storage
- **Service disruption**: Pods kunnen niet meer starten als ze container images moeten ophalen uit ACR
- **Downtime risico**: Bestaande workloads blijven mogelijk draaien, maar nieuwe deployments of updates falen

### Attack surface en credential exposure

Service Principal secrets zijn statische credentials die:

- **Opgeslagen moeten worden**: Ze staan ergens in configuratie of CI/CD pipelines, wat een potentieel lek vormt
- **Handmatig geroteerd moeten worden**: Dit vergroot de kans op menselijke fouten
- **Breed toegang kunnen geven**: Als iemand het secret bemachtigt, heeft deze mogelijk toegang tot meerdere resources
- **Lang geldig zijn**: Hoe langer een credential geldig is, hoe groter het risico bij een datalek

### Waarom Managed Identity veiliger is

Managed Identities elimineren deze risico's door:

- **Automatische credential rotatie**: Azure roteert de credentials automatisch zonder menselijke tussenkomst
- **Geen opslag van secrets**: Er zijn geen credentials die je moet opslaan, delen of beheren
- **Just-in-time tokens**: In plaats van langdurige secrets gebruikt Managed Identity kortstondige access tokens
- **Azure AD integratie**: Volledige integratie met Azure Active Directory voor fine-grained toegangscontrole
- **Audit trail**: Beter inzicht in wie/wat toegang heeft via Azure AD logs

### Compliance en best practices

Veel security frameworks en compliance standaarden (zoals ISO 27001, SOC 2, of PCI-DSS) vereisen:

- Regelmatige credential rotatie
- Minimale credential exposure
- Gebruik van managed identities waar mogelijk
- Audit trails van toegang

Door te migreren naar Managed Identity voldoe je automatisch aan deze eisen zonder extra effort.

## Conclusie

Hoewel beide opties het probleem oplossen, raad ik sterk aan om te kiezen voor **Optie A**: het migreren naar Managed Identity. Dit is niet alleen de door Microsoft aanbevolen best practice, maar bespaart je ook toekomstige hoofdpijn met verlopende secrets.

De migratie is eenvoudig en in de meeste gevallen zonder downtime uit te voeren. Alleen als er specifieke technische redenen zijn die migratie nu onmogelijk maken, is het vernieuwen van het Service Principal secret een acceptabel alternatief.