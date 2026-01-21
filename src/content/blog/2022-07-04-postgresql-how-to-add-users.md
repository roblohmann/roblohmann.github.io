---
title: "PostgreSQL - How to add users"
description: "Stap-voor-stap handleiding voor het aanmaken en beheren van gebruikers in PostgreSQL databases."
pubDate: 2022-07-04
tags: ["PostgreSQL", "Database", "SQL"]
isPublished: true
---
-- MORE INFO > https://docs.microsoft.com/en-us/azure/postgresql/howto-create-users

--1. Database aanmaken
CREATE DATABASE "<database-name>"

--2. Add user
CREATE ROLE "<database-user>" WITH LOGIN NOSUPERUSER INHERIT CREATEDB NOCREATEROLE NOREPLICATION PASSWORD '<password>';

--3. Grant connection access
GRANT CONNECT ON DATABASE "<database-name>" TO "<database-user>"; 

--4. Grant access to all tables for the user. By default the user creating the table is the owner, this doesn't have to be the user connection to the database
GRANT SELECT ON ALL TABLES IN SCHEMA public TO "database-user";

--5 Add UUID (Guid) extension to use this type as PK
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";