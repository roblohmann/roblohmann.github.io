---
title: "PostgreSQL: Database gebruiker toevoegen"
description: "Stap-voor-stap handleiding voor het aanmaken en beheren van gebruikers in PostgreSQL databases."
pubDate: 2022-07-04T00:00:00+02:00
tags: ["PostgreSQL", "Database", "SQL"]
isPublished: false
---

In deze blog leg ik uit hoe je een nieuwe gebruiker toevoegt aan een PostgreSQL database en de juiste rechten toekent. Dit is noodzakelijk wanneer je bijvoorbeeld een applicatie wilt laten verbinden met een aparte databasegebruiker.

## 1. Database aanmaken

Maak eerst een nieuwe database aan:

```sql
CREATE DATABASE "<database-name>";
```

## 2. Gebruiker toevoegen

Voeg een nieuwe gebruiker toe met de gewenste rechten:

```sql
CREATE ROLE "<database-user>" WITH LOGIN NOSUPERUSER INHERIT CREATEDB NOCREATEROLE NOREPLICATION PASSWORD '<password>';
```

## 3. Toegang tot de database geven

Sta de gebruiker toe om verbinding te maken met de database:

```sql
GRANT CONNECT ON DATABASE "<database-name>" TO "<database-user>";
```

## 4. Rechten op tabellen geven

Geef de gebruiker toegang tot alle tabellen in het `public` schema:

```sql
GRANT SELECT ON ALL TABLES IN SCHEMA public TO "<database-user>";
```

> **Let op:** Standaard is de eigenaar van een tabel degene die de tabel heeft aangemaakt. Dit hoeft niet dezelfde gebruiker te zijn als degene die verbinding maakt met de database.

## 5. UUID extensie toevoegen

Wil je UUID's gebruiken als primaire sleutel? Voeg dan de extensie toe:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

Met deze stappen kun je eenvoudig een nieuwe gebruiker aanmaken en de juiste rechten instellen in PostgreSQL.

<em>Meer informatie: [Microsoft Docs - Create users in PostgreSQL](https://docs.microsoft.com/en-us/azure/postgresql/howto-create-users)</em>