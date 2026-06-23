---
title: "Van Knooppunt naar Database: Netwerkverbindingen Testen in Azure Kubernetes Service (AKS)"
description: "Twee methoden om de waarschuwing over verlopen Service Principal secrets in AKS op te lossen: migreren naar Managed Identity of het secret vernieuwen."
pubDate: 2026-06-23T17:00:00+01:00
tags: ["kubernetes", "aks", "azure", "networking"]
isPublished: false
---

Het is de klassieke frustratie van elke cloud engineer of developer: je applicatie is succesvol gedeployed op je Azure Kubernetes Service (AKS) cluster, de omgevingsvariabelen staan goed, maar bij het opstarten crasht de pod met een cryptische melding: "Connection timed out" of "Database not reachable."

In de cloudomgeving van Azure, waar netwerken vaak streng zijn beveiligd met Virtual Networks (VNets), Private Endpoints en Network Security Groups (NSGs), kan er onderweg van je Kubernetes-node naar de database veel misgaan.

In deze blog leer je hoe je als een ware netwerkdetective de verbinding vanaf je AKS-cluster naar verschillende Azure-databases kunt testen, diagnosticeren en repareren.

# De Gereedschapskist: Maak kennis met netshoot
In plaats van blindelings configuraties aan te passen, gaan we testen vanaf de bron. Omdat applicatie-containers vaak minimaal zijn ingericht (zonder tools als nslookup of nc), starten we een tijdelijke debug-pod op in het cluster met de image netshoot. Deze pod zit boordevol handige netwerktools.

Start de pod met het volgende commando in je terminal:
```bash
kubectl run netshoot-test --image=nicolaka/netshoot -it --rm -- bash
```

(De --rm vlag zorgt ervoor dat de pod automatisch netjes wordt opgeruimd zodra je de terminal afsluit).

## Stap 1: DNS-resolutie controleren (De Naamcheck)
Voordat we data kunnen versturen, moet het cluster weten waar de database woont. Azure maakt voor veilige interne verbindingen vaak gebruik van Private Endpoints die gekoppeld zijn aan een Private DNS Zone.

Vervang in de netshoot-pod de onderstaande voorbeelden door jouw eigen database-hostnaam:

### Voor Azure SQL (MSSQL)
```bash
nslookup ecare-azure-dbms1-dev.database.windows.net
```

### Voor Azure Database for PostgreSQL
```bash
nslookup mijn-postgres-db.postgres.database.azure.com
```

### Voor Azure Database for MySQL
```bash
nslookup mijn-mysql-db.mysql.database.azure.com
```

### De uitslag interpreteren:
Goed nieuws (Private Link): Je ziet dat de naam wordt omgezet naar een intern IP-adres (bijvoorbeeld 10.99.0.4) én er staat een privatelink-alias in de response:
```bash
Non-authoritative answer:
Name:    ecare-azure-dbms1-dev.privatelink.database.windows.net
Address: 10.99.0.4
```

Publiek IP: Krijg je een publiek IP-adres terug? Dan verloopt de verbinding via het internet (tenzij dit de bedoeling is). Controleer of je Private DNS Zone wel correct is gekoppeld (Virtual Network Link) aan het VNet van je AKS-cluster.

Foutmelding (NXDOMAIN): De DNS-server kent de naam niet. Controleer op typefouten of DNS-doorstuurregels.

## Stap 2: De Netwerkpoort Testen (De Deurcheck)
Als de naam succesvol wordt vertaald naar een IP-adres, betekent dit nog niet dat de deur ook openstaat. Met het handige hulpprogramma nc (Netcat) testen we of de specifieke databasepoort bereikbaar is.

Gebruik het IP-adres uit de vorige stap of de hostnaam:

1. Azure SQL / MSSQL (Standaard poort: 1433)
```bash
nc -zvw3 10.99.0.4 1433
```

2. Azure Database for PostgreSQL (Standaard poort: 5432)
```bash
nc -zvw3 mijn-postgres-db.postgres.database.azure.com 5432
```

3. Azure Database for MySQL (Standaard poort: 3306)
```bash
nc -zvw3 mijn-mysql-db.mysql.database.azure.com 3306
```

### Wat zegt de output?
Connection ... succeeded! 🎉

Gefeliciteerd! De netwerkweg is volledig vrij. Als je applicatie nu nog steeds niet kan verbinden, ligt het probleem puur in de applicatie-instellingen (zoals een foutief wachtwoord of een verkeerde connection string).

nc: connect to ... port XXXX (tcp) timed out: Operation in progress 🛑

Er is sprake van een blokkade. Je pakketje vertrekt vanaf AKS, maar stuit onderweg op een dichte deur.

## Stap 3: Blokkades Opsporen en Oplossen
Krijg je een timed out? Geen paniek. Dit zijn de drie meest voorkomende plekken in Azure waar het verkeer strandt:

1. De Database Firewall
Zelfs met een Private Endpoint weigeren Azure databases vaak standaard alle verkeer totdat je expliciet toestemming geeft.

Oplossing: Ga in de Azure Portal naar de netwerkinstellingen van je database (Networking).

Zorg bij Private Access dat de status van het endpoint op Approved staat.

Voor PostgreSQL/MySQL: controleer onder de firewall-regels of het IP-bereik van het AKS-subnet (of de specifieke pods) is toegestaan.

2. Network Security Groups (NSGs)
Een NSG fungeert als de uitsmijter van een subnet.

Uitgaand (Egress): Controleer de NSG die aan je AKS-nodes is gekoppeld. Staat uitgaand verkeer naar de poort van jouw database open?

Ingaand (Inbound): Controleer de NSG van het subnet waarin het Private Endpoint van de database zich bevindt. Deze moet expliciet verkeer accepteren op poort 1433, 5432 of 3306 vanaf het AKS-subnet.

3. VNet Peering & Routing
Staat je database in een ander Virtual Network dan je AKS-cluster?

Controleer of de VNet Peering tussen beide netwerken de status Connected heeft.

Zorg ervoor dat in de peering-instellingen de optie 'Allow forwarded traffic' is ingeschakeld.

## Conclusie
Netwerkproblemen in Kubernetes kunnen complex aanvoelen, maar door de keten systematisch op te knippen in DNS (Naam) en Netwerk (Poort) transformeer je giswerk in harde data. Met de netshoot-pod bij de hand zie je binnen enkele seconden precies waar de schoen wringt.

Veel succes met troubleshooten!