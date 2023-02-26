---
title:  "Building Docker containers with Azure Devops"
date:   2020-02-04 00:00:00 +0100
published: false
categories: blog
tags: azure devops kubernetes deployment
---
1. CI & CD Build maken

Foutmelding tijdens build proces dat NuGet.Config of project niet gevonden kon worden

Oorzaak;
<img src="/images/2020/docker-build-context-default.png" />

Goed;
<img src="/images/2020/docker-build-context-proper.png" />

2. Prepare your Kubernetes Cluster

Go to https://shell.azure.com and open up a new Bash shell

Make sure your connected to the correct cluster <CODE>

Execute the following command to create a new namespace
kubectl create namespace <your-namespace-name>

3. Create a release definition