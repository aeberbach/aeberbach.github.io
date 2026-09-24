+++
title = "Amiga 600 port relocator"
date = 2020-10-01
description = ""
[taxonomies]
categories = []
tags = ["Amiga"]
[extra]
excerpt = ""
author = ""
image = "/images/2020-10-01-a600-port-relocator/rear.jpeg"
+++

Amiga 600 port relocator</h1><p>The Amiga 600 has ports right where you don't want them. They're on the right of the machine in the perfect place for the cables to get in the way of where the mouse is going to be rolling around on the desk. Also the typical DE-9 connector does not fit, only molded ones will fit, because the A600 case molding interferes with the lugs on the standard plug.
<p>(It's called a DE-9 because the shell size in the series is 'E' and it has 9 pins. Many people call it a DB-9 - not correct, but I guess if people know what you mean...)

{{<image_thumb path="/images/2020-10-01-a600-port-relocator/side.jpeg" caption="Side ports" />}}

To get around this I though of making a port relocator so that the two side ports are connected to a pair of DE-9 plugs, connected to a single stacked dual DE-9 plug at the rear of the machine. Any such plugs would need to be chopped to fit in space allowed by the A600 case, so I had to find some that would not fall apart when one lug is removed as is required for the right plug. The left plug needs less modification but still must have a corner trimmed off.

{{<image_thumb path="/images/2020-10-01-a600-port-relocator/side-rear.jpeg" caption="From an angle" />}}

{{<image_thumb path="/images/2020-10-01-a600-port-relocator/rear.jpeg" caption="Plug in here" />}}

</a></p><p>One kind of connector that can be cut in this way is made by Amphenol, and is sold by <a href="https://www.digikey.com.au/product-detail/en/ID09S33E4GX00LF/609-5771-ND/1536372">Digikey</a> and probably other places too. The face of the connector is crimped all round to the body.

{{<image_thumb path="/images/2020-10-01-a600-port-relocator/chopped.jpeg" caption="Chopped connectors" />}}

PCB design was done in KiCAD. There is nothing but connectors, header and PCB. It is necessary to use two PCBs here because the connectors sit up above the base of the machine. Using 2.4mm substrate on the top board and a 2.54mm-spaced header including 2.54mm spacer between the boards makes the lower board able to pass under the floppy drive bulge. Using 2.4mm substrate for the lower board also should result in a nice solid assembly that has room for slim rubber feet underneath. The eighteen-pin header connects the two 9-pin ports between the boards. The four-pin header is only for extra stability, it connects to nothing.</p><p>I have not built this (that's why pictures show a cardboard mockup). If you do I would be interested to know how it works. Maybe I will one day if I get some cheap way of making simple PCBs. Most people use cables for this apparently, but then that still sticks out the right side of the machine...
<p>Find the whole project on my <a href="https://github.com/aeberbach/A600-side-port-relocator">github account</a>.