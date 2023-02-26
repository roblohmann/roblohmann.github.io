---
title: "CodeCube.ExifLib"
excerpt: "a new life for an old library"
date:   2019-07-27 00:00:00 +0100
published: true
#header:
#   image: /assets/images/foo-bar-identity.jpg
#   teaser: /images/coding-teaser.jpg
# sidebar:
#   - title: "Role"
#     image: http://placehold.it/350x250
#     image_alt: "logo"
#     text: "Designer, Front-End Developer"
#   - title: "Responsibilities"
#     text: "Reuters try PR stupid commenters should isn't a business model"
# gallery:
#   - url: /assets/images/unsplash-gallery-image-1.jpg
#     image_path: assets/images/unsplash-gallery-image-1-th.jpg
#     alt: "placeholder image 1"
#   - url: /assets/images/unsplash-gallery-image-2.jpg
#     image_path: assets/images/unsplash-gallery-image-2-th.jpg
#     alt: "placeholder image 2"
#   - url: /assets/images/unsplash-gallery-image-3.jpg
#     image_path: assets/images/unsplash-gallery-image-3-th.jpg
#     alt: "placeholder image 3"
---

Two years ago I started building my very first mobile app. Back then Xamarin.Forms was fairly new and hot, so I decided to follow the crowd and also do this. My mobile app had to do something with images, so it needed to be able to take pictures and read Exif information from them. Esspecially the GPS-info from these images.

After some research I found a very light-weight, thus fast and small library named ExifLib. I decided to use the PCL-version on on [NuGet][1], but had it’s last update back in 2016. Nevertheless I decided to use the package and the package did everything I needed. However, due to various reasons the development for my mobile application completely stopped. It never went to production and the world never got to use it.

Now two years later I decided to get back to work again with the vision to finish it by the end of this summer. I opened up the project again, but ofcourse the world moved on. So there were tons of packages to update and also Xamarin.Forms moved from PCL (Portable Class Libraries) to .NET standard, obviously. So basically the work started again, so much was changed that I decided to re-create the entire project. And then I ran into an issue. Because the existing package only worked for PCL-projects and with the new Xamarin.Forms project I was using a .NET standard.

So my research started again and quickly I found [ExifLib.Standard][2]. This package was created in 2018 based on the original [ExifLib version from Simon McKenzie][3]. But the interface had changed and I didn’t want that. Since I’m a bit of a controlfreak with these things I decided to create a new version on NuGet based on the PCL version I was using. But then suitable for .NET standard. After a little bit of work it was done 🙂

The code is on GitHub: [https://github.com/roblohmann/CodeCube.ExifLib][4]
The package is on NuGet: [https://www.nuget.org/packages/CodeCube.ExifLib/][5]

[1]: https://www.nuget.org/packages/ExifLib.PCL/1.0.1 "ExifLib.PCL"
[2]: https://www.nuget.org/packages/ExifLib.Standard/ "ExifLib.Standard"
[3]: https://www.codeproject.com/Articles/36342/ExifLib-A-Fast-Exif-Data-Extractor-for-NET
[4]: https://github.com/roblohmann/CodeCube.ExifLib "CodeCube.ExifLib on Github"
[5]: https://www.nuget.org/packages/CodeCube.ExifLib/ "CodeCube.ExifLib on NuGet"