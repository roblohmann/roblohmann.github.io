---
title:  "How to purge images from Azure Container Registry?"
date:   2023-03-15 14:39:00 +0100
published: false
categories: blog
tags: sql
---

az acr task create \
      --name "ScheduledACRPurge" \
      --cmd "acr purge --filter '.*:.*' --ago 30d --keep 5 --untagged" \
      --schedule "55 18 * * Wed" \
      --registry myregistry \
      --context /dev/null
      
#!/bin/bash

#https://pixelrobots.co.uk/2020/02/purge-container-images-from-azure-container-registry-acr-on-demand-or-on-a-schedule/
#https://learn.microsoft.com/en-us/azure/container-registry/container-registry-auto-purge
#https://www.mytechramblings.com/posts/automatically-purge-acr-images-using-acr-tasks/
#https://learn.microsoft.com/en-us/cli/azure/acr/task?view=azure-cli-latest

#WERKEND
#PURGE_CMD="acr purge --filter '.*:.*' --untagged --ago 30d --keep 5 --untagged"
#PURGE_CMD="acr purge --filter 'myrepository:^((?!latest).)*$' --ago 30d --keep 5 --untagged --dry-run" 

#PURGE_CMD="acr purge --filter 'myrepository:^((?!latest).)*$' --ago 30d --keep 5 --untagged"
PURGE_CMD="acr purge --filter '.*:^((?!latest).)*$' --ago 30d --keep 5 --untagged"

az acr run \
  --cmd "$PURGE_CMD" \
  --registry myregistry \
  /dev/null

#az acr task create --name purgeTask \
#  --cmd "$PURGE_CMD" \
#  --registry myregistry \
#  --context /dev/null
