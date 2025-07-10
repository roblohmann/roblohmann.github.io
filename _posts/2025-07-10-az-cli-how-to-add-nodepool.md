---
title:  "Alle tabellen doorzoeken met SQL"
date:   2025-07-10 15:46:00 +0100
published: true
categories: blog
tags: kubernetes 
---

Ik ben vandaag bezig geweest met een Azure Kubernetes Cluster waarbij een nodepool toegevoegd moest worden. De huidige nodepool was gebaseerd op Virtual Machines met te weinig CPU. Kortom, tijd voor een nieuwe nodepool met een ander type Virtual Machine zodat het cluster beter eventuele pieken kon opvangen. Met de huidige configuratie duurde het te lang voordat auto-scaling acties plaats hadden gevonden.

Om dit op een goede manier te doen, zonder downtime op het cluster zijn de volgende stappen nodig.

### **Stap 1: De nieuwe nodepool toevoegen aan het cluster**

```bash
az aks nodepool add \
	--name np3appp \
	--cluster-name <de-naam-van-het-cluster> \
	--resource-group <de-resourcegroup-van-het-cluster> \
	--max-pods 250 \
	--mode User \
	--node-count 3 \
	--node-osdisk-type Ephemeral \
	--node-vm-size Standard_D4ads_v6 \
	--os-sku Ubuntu \
	--os-type Linux \
	--zones 1 2 3 \
	--enable-cluster-autoscaler \
	--min-count 3 \
	--max-count 6
```

> **Tip:** Zorg altijd dat een nodepool kan auto-scalen. Zeker voor productieomgevingen wil je altijd minimaal 3 nodes hebben, zodat er bij eventuele onderbrekingen altijd een beschikbaar is.

In dit geval gaat het om een zogenaamde ```user-pool```, een nodepool dus waar enkel mijn eigen containers op draaien.
Kubernetes gebruikt ```system-pools``` voor containers die nodig zijn om de kubernetes laag stabiel te houden. Uiteraard kun je desgewenst ook een nieuwe ```systempool``` aanmaken. Dit kan met het volgende command:

```bash
az aks nodepool add \
    --name systempool \
	--cluster-name thuismaatje-aks-p \
	--resource-group thuismaatje-aks-p-rg \
	--max-pods 50 \
	--mode System \
	--node-count 3 \
	--node-osdisk-type Ephemeral \
	--node-vm-size Standard_D4lds_v5 \
	--os-sku Ubuntu \
	--os-type Linux \
	--zones 1 2 \
	--enable-cluster-autoscaler \
	--min-count 3 \
	--max-count 6 \
	--node-taints "CriticalAddonsOnly=true:NoSchedule"
```

Zoals je ziet is het principe hetzelfde. Met als enige verschil dat ik hier een tant toevoeg. Op deze manier weet kubernetes dat er op deze nodepool geen containers gescheduled mogen worden die in mijn ```userpool``` thuishoren.

### **Stap 2: Uitvoeren van het 'Cordon command'**

De volgende stap is het uitvoeren van het ```Cordon```-command op de **specifieke node in de nodepool** die nu het CPU-probleem heeft. Dit commando zorgt ervoor dat er geen nieuwe pods meer gescheduled worden op deze nodepool.

Dit kan als volgt gedaan worden.

```bash
kubectl cordon <naam-van-de-vmss>
```

Concreet zou dit dus iets kunnen zijn als

```bash
kubectl cordon aks-<naam-van-je-aks-cluster>-<random-nummer>-vmss000000
```

Je kunt dit commando voor meerdere nodes in de nodepool uitvoeren op de volgende manier
```bash
kubectl cordon aks-<naam-van-je-aks-cluster>-<random-nummer>-vmss000000 aks-<naam-van-je-aks-cluster>-<random-nummer>-vmss000001
```

Dit commando kan op elk gewenst moment uitgevoerd worden. In dit geval doe ik dit niet direct in deze situatie, maar vlak voor een release die op een later moment gepland heb.

### **Stap 3 Uitvoeren van het 'Drain-command'**

Het ```drain```-command kan net als het ```cordon```-command uitgevoerd worden op een specifieke node in de nodepool. Dit om te zorgen dat alle containers op de node worden afgesloten. In combinatie met het ```cordon```-command zorgt dit ervoor dat de containers niet meer gescheduled worden op de oude nodepool, maar op de nieuwe. Als je dan ook zorgt dat je drie nodes in je pool hebt, in combinatie met de juiste update strategrie van je containers, zit je goed. Want dan regelt kubernetes een overgang zonder dat de gebruiker het ( hopelijk ;-) ) merkt.

Het command kan als volgt uitgevoerd worden. In dit voorbeeld doe ik het voor meerdere nodes in de pool. Maar dit kan er ook een zijn.

```bash
kubectl drain aks-<naam-van-je-aks-cluster>-<random-nummer>-vmss000000 aks-<naam-van-je-aks-cluster>-<random-nummer>-vmss000001 --ignore-daemonsets --delete-emptydir-data
```

Je ziet dat ik hier twee extra parameters meegeeft. Namelijk ```--ignore-daemonsets``` en ```--delete-emptydir-data```. Deze commands help om te zorgen dat de betreffende node op een gecontroleerde manier geleegd wordt.

#### Uitleg van de gebruikte parameters
```bash --ignore-daemonsets```

Deze optie negeert pods die zijn beheerd door DaemonSets.
Normaal probeert ```kubectl drain``` alle pods van een node te verwijderen.

Pods die onder een DaemonSet vallen kunnen echter niet worden verwijderd via een normale kubectl delete pod, omdat ze automatisch opnieuw worden gemaakt door de DaemonSet-controller.

Deze flag zorgt ervoor dat kubectl drain deze pods overslaat in plaats van te falen.

```bash --delete-emptydir-data```

Deze optie verwijdert pods die gebruik maken van ```emptyDir volumes```, zelfs als dat betekent dat er niet-opgeslagen data verloren gaat.

```emptyDir volumes``` zijn tijdelijke volumes die alleen bestaan zolang een pod op een node draait.

Zonder deze optie weigert kubectl drain pods te verwijderen die ```emptyDir``` gebruiken, omdat dit leidt tot dataverlies.

> **LET OP:** Met deze optie accepteer je expliciet dat de tijdelijke data wordt verwijderd. Gebruik deze optie dus alleen als je zeker weet dat het geen probleem is om tijdelijke data kwijt te raken!