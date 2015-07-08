---
layout: post
title: "StackExchange API"
tags:
- computer
- DIY
---
<meta charset="utf-8"> 
I've been looking into the 2.2 API for StackExchange and it's a pleasure to use with the exception of one thing. Once you have identified a user whose content you are interested in you can get their network user_id from just about any query made about that user. If that's the one thing you save then the network-wide **/users/{ids}/associated** query can get you the sites the user is active on, and that opens up the rich set of queries that require the site argument. But the **associated** query returns only the URL for the sites (http://stackoverflow.com"), and the screen name of the sites ("Stack Overflow"), not the canonical site identifier ("stackoverflow")! I think there must be a filter or something I have missed, it is the only time I have had to mess around with strings in all the queries I have done in developing this app today, and I have run out of request quota. For now I am getting around it by splitting the URL and using everything after "//" - the documentation says "stackoverflow.com" is just as good as "stack overflow" in the site argument and it does work. But this does seem like a big oversight in what is otherwise a fantastic API.

Another thing worth mentioning is how easy this is in iOS in 2015\. With Swift and NSMutableURLRequest it all just works, asynchronously, no need for any external libraries. As recently as last year I wouldn't have even thought of doing something like this without first grabbing AFNetworking.