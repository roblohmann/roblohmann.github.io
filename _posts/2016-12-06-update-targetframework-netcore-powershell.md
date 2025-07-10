---
title:  "Update targetframework for .NET Core projects with PowerShell"
date:   2019-12-06 00:00:00 +0100
published: true
categories: blog
tags: powershell
---
With the recent release of .NET Core 3.1 last Wednesday, I decided to upgrade to current project I’m working on from .NET Core 3.0 to .NET Core 3.1. This sounds easy right?

Well not if the solution contains a mix 48 .NET Core 3 and .NET Standard 2.1 projects. And this time I decided not to do this manually.

I recently found a PowerShell script on the internet which allowed me to add a property to all .csproj files in the solution. So I grabbed this as my starting point, because now that I could to that it shouldn’t be that difficult to update properties in a similar way :-)

Fortunately it didn’t cost me much time to create a script that could do this for me. Even with a configurable boolean to make sure I’m not overwriting any .NET Standard projects.

Below is the script. Which is also [hosted on my GitHub][1] by the way!

{% highlight C# %}
#find all csproj files recursive in this directory
$paths = Get-ChildItem -include *.csproj -Recurse

$OnlyUpdateMatchingFrameworks = $true #can also be #false

$desiredTargetFramework = "netcoreapp3.1"

#foreach found file, update the framework
foreach($pathobject in $paths)
{
    $path = $pathobject.fullname
    $doc = New-Object System.Xml.XmlDocument
    $doc.Load($path)
    $node = $doc.SelectSingleNode("//Project/PropertyGroup")
	$TargetFrameworkNode = $node.SelectSingleNode("TargetFramework")
	
	if (-not $TargetFrameworkNode) {
       write-host "Node does not exist!"
    }
    else {
        write-host "Node found!"

        write-host "value was" + $TargetFrameworkNode.InnerText

        if($OnlyUpdateMatchingFrameworks -eq $true)
        {
            write-host "Only matching nodes may be updated! Checking.."

            if($TargetFrameworkNode.InnerText -like "netcoreapp*")
            {
                write-host "Updating node!"

                $TargetFrameworkNode.InnerText = $desiredTargetFramework    
            }
        }
        else{
            write-host "Updating node!"

            $TargetFrameworkNode.InnerText = $desiredTargetFramework
        }        

        write-host "value is" + $TargetFrameworkNode.InnerText

        $doc.Save($pathobject)
    }    
}
{% endhighlight %}

[1]: https://github.com/roblohmann/Azure-CLI-Scripts/blob/master/Powershell/update-framework-netcore.ps1 "Script to update targetframework"