+++
title = "Compact Macintosh video - 1"
date = 2021-06-01
description = "Why replace a CRT?"
[taxonomies]
categories = []
tags = ["Mac"]
[extra]
excerpt = ""
author = ""
image = "/images/2021-06-01-mac-video-1/damage1.jpg"
+++
Why a new screen?</h2><p>A confession: when the Macintosh SE FDHD first appeared in the studio where I was a junior Finished Artist I was not its biggest fan. I liked Dark Castle but it was a slow machine with a tiny screen and hid so much of what a computer did. Still, Quark and Aldus made it obvious that my job would not be around much longer. Instead I went back to university for a Computer Science degree. Then I had Amigas, PCs, finally going back to a G4 after the best PC I could build crashed one time too many.</p><p><a href="/images/2021-06-01-mac-video-1/finished-art.jpg">

{{<image_thumb path="/images/2021-06-01-mac-video-1/finished-art.jpg" caption="Finished Art things" />}}

</a></p><p>(A Finished Artist was kind of a graphics technician. I cut out pieces of text and graphics with a scalpel and stuck them down on a backing board, with hot wax or spray adhesive, the way the finished print should look. If something was the wrong size I changed that with a reprographic camera. If I needed something typeset I used a machine projecting light onto film, selecting and exposing characters individually. Red film known by brand name Rubylith photographed as black and could make good lines or backgrounds. Not a great job, and the constant chemical exposure was probbaly not healthy either.)</p><p>Years later I'm appreciating the Macintosh SE/30. Many agree; it is the greatest Mac of all time.</p>

{{<image_thumb path="/images/2021-06-01-mac-video-1/gruber.jpg" caption="Endorsement" />}}

<p>Sadly, compact Macintoshes are showing their age, yellowed, covered in anti-theft engraving and well-meant stickers and grime beyond belief. The rare really good ones have sold for surprising prices, almost up to the retail price of the SE FDHD setup I first encountered. If you want a vintage Mac you either get unbelievably lucky or you should prepare to pay. Or live in California; from what I see online that's just as good.</p><p>Maintenance on an old Mac always starts with removing the battery. The Tadiran or Maxell batteries of the period always leak eventually, dissolving PCB traces and component legs. If you get to it before that happens you need to replace capacitors - the telltale fishy smell means the capacitors have leaked and their corrosive juices are slowly dissolving any nearby metal. The case can be cleaned, and some whiten them but if done basdly this can make old plastic chalky or brittle. An old SCSI drive can be replaced with a modern solid-state replacement for reliability but also much more speed. RAM can be replaced or increased and is readily available.</p><p><a href="/images/2021-06-01-mac-video-1/damage1.jpg">

{{<image_thumb path="/images/2021-06-01-mac-video-1/damage1.jpg" caption="Gallery of horror" />}}

</a></p><p>Power supplies often need attention even if they appear to be working. They're like an older athlete, maybe the best in the world at one time but no longer. If your power supply is old then things might look like they are working until the current requirement goes up and then your Mac crashes. Fortunately they can be rejuvenated and new capacitors are often all it takes.</p><p>The part you can't fix, and that inevitably fails with even the most careful use, is the screen subsystem. Capacitors can be replaced but the the flyback transformer is a problem. It's a big component that generates the high voltage required for the CRT and it gets quite hot. On a long enough time scale all flybacks will fail due to the stresses they operate under. As of now I don't know of any source for a new flyback. Sometimes they can be found but they're not cheap and often not new - so how long will they last?</p><p>If things go wrong the screen can show many symptoms sometimes indicating the fault; weird distorted lines or a single point of light perhaps. Often the lines and edges are distorted or fuzzy and cannot be adjusted because components have drifted out of spec. On one of my SE/30s the brightness control just stopped working even though everything tested fine.</p><p><a href="https://youtu.be/zr_Q4bGI_qY">

{{<image_thumb path="/images/2021-06-01-mac-video-1/jdw-video.jpg" caption="JDW's recap video" />}}

</a></p><p>Fortunately the retro Mac community is not short of awesome people who will show you how to do all this!</p><p>But what if you get a Mac missing parts, or your last good flyback transformer gives up? Without an alternative it's curtains for that Mac - reserved for spare parts at best. Some replace the inside with various things from Mac minis to Raspberry Pis and a collection of hacks to run a LCD display. If every repair involves some degree of departure from original, then a new component has the least while replacing the entire inside of the machine possibly has the most. That isn't for me because at the end of the day I want the compact Mac, not a Mac mini in a bulky box with a tiny screen.</p><p>So what to do about the screen? Some requirements at the start of this project:</p>screen as close to original size as possiblemonochrome displaycase must close and it must still look like the original machineno interference with any expansion slot or other accessoryno irreversible alterations to the Macjust worksI'll refer to these requirements as the project develops. I started looking at LCDs.