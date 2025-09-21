As this Project isn't production ready, i wanted to share with everyone who gives a look at it a preview of what's done and what's not

### What's Done

- [x] Render each React Pages in Server Side
- [x] Use redis caching on Server Side rendered pages to improve performance
- [x] image caching (will switch to stream soon)
- [x] automatic static delivery for important static files like sitemap.xml
- [x] Create a HTML page streaming method that will considerably reduce the Time to First byte (TTFB)
### Next-Step

- [ ] Create a Render per component system to increase performance (Like it's what i do for living.. LOL)
- [ ] Implent a smart cache expiration
- [ ] Create FSX-Compiler, based on Vite but lighter to FSX uses only
There are some codes that works only in my case, it's why i said DEVELOPMENT VERSION. PLS be indulgent & Ask or [CREATE AN ISSUE](https://github.com/Famous-Tech/FSX/issues) for any bugs found while trying this development version.