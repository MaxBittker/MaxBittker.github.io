---
title: RC Pop-up Day 2 - wall drawing
date: 2017-12-06 00:00:00
---
> “The idea is the machine that makes the work of art” - Sol LeWitt
<div style="display:inline-block; margin:auto; width:100%">
<img style="margin:auto;float: none; max-height:none;" src="./google.png" alt="google.com">
</div>

Sol LeWitt's *Wall Drawing* series are works that are defined as simple sets of instructions, and drawn directly onto walls.

Because they are constructed algorithmically according to the conditions of the space and the drafters, these pieces reflect their environment and are unique each time they are implemented. *Wall Drawing #51*, 1970 is the first of the series to make this implicit relationship to the space it inhabits an explicit one. Its instruction card reads: 

>"All architectural points connected by straight lines."

<div style="display:inline-block; margin:auto; width:100%">
<img style="margin:auto;float: none; max-height:none;" src="./sol-lewitt-wall-drawing-51.jpg" alt="sol lewitt 51">
</div>

Usually implemented on art gallery walls using a chalk snapline, the construction tool is used to expose the space's shape and relationships between its elements. Connecting both decorative and functional features into a network illustrates the symmetries, asymmetries, patterns and focal points of the space.

I implemented this idea not on a wall, but on a web page. 

Because my instruction set needed to be executed by a web browser and not a human, it was written in javascript, and I could not rely on the drafters judgement as a heuristic for what constituted an "architectural point". After some experimentation, I allowed lines between `div`, `img`, `svg`, `iframe`, `table`, `canvas`, and `h1` tags larger than a certain size that did not intersect either of their bridging elements.

I'm pleased with the results, particularly the way that they play out differently on pages constructed in different eras and with differing techniques and technologies. Hand-crafted HTML shows in its simplicity, while some visually elegant sites can reveal the more complicated tools they were built with.

Brutalism is a trend that has been making a comeback in web design, exposing the nature of the browser and laying bare the materials of HTML and CSS instead of working to conceal them, and I think this piece fits into that thought process.

This code is packaged as a bookmarklet below, so you can try it out here or on any page yourself! 

<a id="thelink" href="javascript:(function(){window.s0=document.createElement('script');window.s0.setAttribute('type','text/javascript');window.s0.setAttribute('src','https://bookmarkify.it/bookmarklets/7722/raw');document.getElementsByTagName('body')[0].appendChild(window.s0);})();">I am the bookmarklet! Click me, or drag me to your bookmarks bar :)</a>

[Script, hosted on github.](https://github.com/MaxBittker/mutagen/blob/master/51.js)
 (can be executed by pasting into console)

<div style="display:inline-block; margin:auto; width:100%">
<img style="margin:auto;float: none; max-height:none;" src="./piratefsh.github.io_about_.png" alt="sher minn's about me">
<img style="margin:auto;float: none; max-height:none;" src="./berkshirehathaway.png" alt="berkshirehathaway">
<img style="margin:auto;float: none; max-height:none;" src="./rochester.craigslist.org_.png" alt="craiglist">
<img style="margin:auto;float: none; max-height:none;" src="./spacejam.png" alt="spacejam">
</div>
A Debug view:
<img style="margin:auto;float: none; max-height:none;" src="./chrome-error.png" alt="chrome error">
</div>


<!-- 
<div style="display:inline-block; margin:auto; width:100%">
<img style="margin:auto;float: none; max-height:none;" src="./example.com_.png" alt="example.com rendered"> 
</div>-->





<!-- 
<div style="display:inline-block; margin:auto; width:100%">
<img style="margin:auto;float: none; max-height:none;" src="./variable-Diagram.jpg" alt="sol lewitt diagram">
</div> -->
