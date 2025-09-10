As this Project isn't production ready, i wanted to share with everyone who gives a look at it a preview of what's done and what's not

### What's Done

- [x] Render each React Pages in Server Side
- [x] Use redis caching on Server Side rendered pages to improve performance
- [x] image caching (will switch to stream soon)
- [x] automatic static delivery for important static files like sitemap.xml

### Next-Step

- [ ] Create a Render per component system to increase performance (Like it's what i do for living.. LOL)

- [ ] Create a HTML page streaming method that will considerably reduce the Time to First byte (TTFB)

- [ ] Implent a smart cache expiration

There are some codes that works only in my case, it's why i said DEVELOPEMENT VERSION. PLS be indulgent.