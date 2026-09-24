+++
title = "Amiga MMU Software"
date = 2019-05-16
description = ""
[taxonomies]
categories = []
tags = ["Amiga"]
[extra]
excerpt = ""
author = ""
image = ""
+++

<h2>68030</h2>
Since getting the 3.1.4 software from Hyperion I have been seeing a message about no 68030.library being available, but then Workbench proceded to load and for a while I thought no more about it...
<p>Getting software on the Amiga had been pretty annoying. My storage is a disk module that has no master/slave setting so I have not tried to connect another drive. Also my power supply is suspect so I have not tried to boot two drives and therefore can't just fill a drive with software on another machine. I tried out Amiga Explorer with the serial port (and had too much fun wiring up a D-25 cable) and it worked, but things were so slow. I found that a PCMCIA card would let me transfer data over the network so I bought one, a D-Link DFE-670TXD. This card was mentioned in a few forums as working. TCP/IP would be much faster than 19.2K serial!

{{<image_thumb path="/images/2019-05-16-amiga1200-mmu/DFE-670TXD.jpeg" caption="Glorious 16-Bit Networking" />}}

Then I downloaded the Miami TCP stack and of course chose to install the 68020 version since the Amiga 1200 is a 68020 and I have a 68030 anyway. It connected to a network.I could ping it, even see ARP traffic. But it never worked with Amiga Explorer.</p><p>With the keyboard project finished (sort of - keycaps are being made. Article to come...) and the case screws back in I decided to search a bit and get rid of the 68030.library warning. I grabbed the MMU package by Thomas Richter and installed and ...wow. Everything went faster. And as soon as I tried Miami TCP again with Amiga Explorer it connected first try, and transferred data as quickly as I could wish. So there you go - you need that library.
<h2>Power Supply</h2>
When I got the Amiga it had an ancient half-height hard drive in it that I initially figured was bad - but later found that it was fine, the Amiga just did not supply enough power. In an external adapter in WinUAE it was recognised as a valid Workbench. Additionally FA/18 will play but with corrupted graphics eventually - also due to low power? I hope so. So I bought a MeanWell RPT-60B open frame power supply module and will fit it in a ventilated case (when that arrives). Since I will also want to power a couple of 5V devices from time to time including an OSSC (scan converter) I'm thinking of building a modular output so I can add a 5V cable to power things from the supply rather than using a bunch of plugpacks.