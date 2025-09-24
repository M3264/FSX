As this Project isn't production ready, i wanted to share with everyone who gives a look at it a preview of what's done and what's not

### What's Done

- [x] Render each React Pages in Server Side
- [x] Use redis caching on Server Side rendered pages to improve performance
- [x] image caching (will switch to stream soon)
- [x] automatic static delivery for important static files like sitemap.xml
- [x] Create a HTML page streaming method that will considerably reduce the Time to First byte (TTFB)
- [x] Create an automatic renderer that renders the page using the method it's called with, (Instead of editing the whole code to change the rendering method)
- [x] Create a Render per component / pages system to increase performance (Like it's what i do for living.. LOL)
### Next-Step

- [ ] Implement a smart cache expiration system
- [ ] Create FSX-Compiler, based on Vite but lighter for FSX uses only


**There are some codes that works only in my case, it's why i said DEVELOPMENT VERSION. PLS be indulgent & Ask or [CREATE AN ISSUE](https://github.com/Famous-Tech/FSX/issues) for any bugs found while trying this development version.**