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

## Conclusie

Hoewel beide opties het probleem oplossen, raad ik sterk aan om te kiezen voor **Optie A**: het migreren naar Managed Identity. Dit is niet alleen de door Microsoft aanbevolen best practice, maar bespaart je ook toekomstige hoofdpijn met verlopende secrets.

De migratie is eenvoudig en in de meeste gevallen zonder downtime uit te voeren. Alleen als er specifieke technische redenen zijn die migratie nu onmogelijk maken, is het vernieuwen van het Service Principal secret een acceptabel alternatief.