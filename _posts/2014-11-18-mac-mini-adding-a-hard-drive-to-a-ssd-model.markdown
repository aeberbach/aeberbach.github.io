---
layout: post
title: "Mac mini: Adding a Second Drive to a  2014 SSD Model"
tags:
- computer
- DIY
---
<meta charset="utf-8"> 
November 16, great excitement! New stuff from Apple, including a Mac mini - sadly not quite as I had hoped but good enough. Our old mini is a 2009 white top model, Intel, but definitely showing its age. A SSD helped but it wasn't really keeping up especially with kids in the house who leave Flash games running in the background.

The amount of anger about soldered RAM was fairly predictable. It's easier for a lot of people to believe that this is some kind of Apple plot to overcharge for RAM than it is to think about the actual cost of two SODIMM sockets in every machine, no matter how many people never upgrade - so that's what people did. I just bought the 16GB. Every mini I have owned has ended up with maxed RAM and storage and as I hope to get 5 years out of this one too I also upgraded to i7 3.0GHz - this is the machine that does the most video en/recoding.

HD5000 graphics is a huge bonus - many think integrated graphics is still at the level of GMA650, i.e. terrible. I spent the last year with a MacBook Air 11" with the same graphics and was able to play Diablo III, Starcraft II, L4D2, run various 3D CAD programs, no problems. So even though that isn't the main purpose of this machine it's nice to have it.

Storage was the final consideration. I thought a lot about the 1TB Fusion option but ultimately decided I would rather have a better SSD as boot drive with a much larger SATA drive as bulk storage. So I bought the 256GB PCIe-based Flash Storage option and expected to slot in a big SATA drive at my convenience, while using an external 3TB drive right away.

Then I decided to open it up and take a look. I needed my Torx T6 Security bit. There was some whining about this tool being rare or difficult to find, from various sources including iFixit, but it seems to have dried up now iFixit sell this tool. I've had mine (part of a set) for years.

The bad news is that the SATA cable is not included in minis fitted with only a PCIe drive. The PCIe SSD cable is not included with models containing only a SATA drive. The Fusion drive models will include both (but how useful is a 128GB SSD? Or 1TB SATA?) I think the PCIe model is the one to buy - I would have liked the 1TB SSD, but if money was unlimited I would be buying a Pro. Probably OWC and others will be offering these PCIe storage blades just as they did for the MacBook Airs.

I bought the <A HREF="https://www.ifixit.com/Store/Mac/Mac-Mini-Dual-Drive-Kit/IF171-005" target="_blank">iFixit Mac mini dual drive</A> (This kit does NOT include the <A HREF="https://www.ifixit.com/Store/Parts/TR6-Torx-Security-Screwdriver/IF145-225-2" target="_blank">iFixit Torx T6 Security driver</A> and set to installing a 2TB Samsung drive (ST2000LM003 HN-M201RAD) extracted from a Seagate Backup Plus Slim Portable Drive. In Australia at least it's cheaper to buy the complete external 2TB than a bare drive.
<figure>
<img src="{{ site.baseurl }}/assets/IMG_0010-1024x553.jpg?raw=true">
<figcaption>Driver carrier before fitting SATA hard drive</figcaption>
</figure>
This is the mini with the main assembly removed, power supply and drive carrier remaining. Here's how it looks before the SATA drive and cable are installed. You can see the PCIe cable ready to plug into the mini's main board but there's no SATA cable.  
<figure>
<img src="{{ site.baseurl }}/assets/IMG_0012-1024x624.jpg?raw=true">
<figcaption>Apple grommets have a large hole, iFixits are smaller.</figcaption>
</figure>
The iFixit kit includes hex-head grub screws and a set of four grommets. These grommets are a neat fit for the grub screws and they should replace the four original Apple grommets which have a larger hole. With the drive in place it is easy to insert each of the grub screws and secure the drive. If you're too lazy to find a hex key for this, the T6 Torx bit fits just fine. Don't tension them too much if you do this or you will ruin the Torx bit.
<figure>
<img src="{{ site.baseurl }}/assets/IMG_0014-1024x470.jpg?raw=true">
<figcaption>2.5" HD mounted, ready to reassemble.</figcaption>
</figure>
With the drive installed you can see the SATA connector ready to connect to the main assembly on the left, with the power supply connector in the middle and the PCIe connector at right.

Putting everything together you will notice that while the PCIe connector has a cover secured by two screws to hold it in place, the SATA connector does not. There is a screw hole to the side of it so probably if there is ever an Apple upgrade kit there will be a similar cover in it... It would be easy to make one but in my stock of screws stripped out of of MacBooks and the like I did not have one small enough, so I left it. A bit of Kapton tape would be an OK solution. Or if your mini doesn't get bumped around it shouldn't fall out anyway.
<figure>
<img src="{{ site.baseurl }}/assets/Screen-Shot-2014-11-18-at-8.32.49-PM-300x173.png?raw=true">
<figcaption>The internal 2TB drive as reported by "About This Mac"</figcaption>
</figure>

Here's the result - some of the drive is used because I've started copying over the media library. The 3TB Seagate Desktop drive can stay as a backup for most of this stuff, but now can be moved over the the USB slot on the Airport to act as a remote bulk store. Job done! At least until 2TB PCIe SSD modules are cheap enough.