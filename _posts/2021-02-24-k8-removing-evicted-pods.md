---
title:  "Kubernetes: Removing Evicted pods"
date:   2021-02-24 00:00:00 +0100
published: true
categories: blog
tags: kubernetes
---
Recently I’ve been working a lot with Kubernetes in the Azure Cloud for my current employer. While deploying a microservice to a newly created namespace I saw that a lot of pods where having the status ‘Evicted‘. But what was the status ‘Evicted‘? I’d never seen it before.

A quick Google brought me to [Kubernetes.io][1] (ofcourse). And there I read that it means my cluster was running out of resources. Which made sense because I was expanding the cluster with new namespaces and multiple new pods, but I haven’t added any additional nodes.

My current Kubernetes Service was running three nodes in the same pool based on a Standard_D2_v3 Virtual Machine. Basically this means I was running three Virtual Machines in my cluster.
This configuration allows me up to 30 pods according to Azure. But was that still sufficient enough? I Already had three namespaces with an average of 7-9 pods. So I was running close to the suggested maximum of 30 pods already.
Luckily this was easily solved by adding an additional node!

After that I ran the kubectl-command below the remove all Evicted pods in my namespace. And everything was fine again

{% highlight shell %}
kubectl get pod -n <my-namespace> | grep Evicted | awk '{print $1}' | xargs kubectl delete pod -n <my-namespace>
{% endhighlight %}

[1]: https://kubernetes.io/docs/tasks/administer-cluster/out-of-resource/