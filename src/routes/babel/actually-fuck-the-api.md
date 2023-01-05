---
title: Scraping vs. The Youtube API.
description: Who needs the Youtube API when you have scraping?
tags: ["tech", "tutorial-like", "blogging"]
showtoc: true
category: articles # name of directory
metaimage: 'fuck-the-api.png'
type: complete # complete, ongoing, group [should come with an attribute (partAmnt)]
createdAt: 2021-09-14
updatedAt: 2021-09-14
---

_If you haven't seen the FIRST article, no need to. It's basically meaningless now. but you know what [here you go anyway!](https://www.enbyss.com/babel/articles/how-to-youtube-api)_

Hahahahahaha. Hahaha. Ha.

So here's a funny story. I went through all of that trouble to use the youtube API, right? The OAuth tokens and API keys and everything. Here's the problem right? I actually maxed the quota. Yep, that's right. Used up all my calls instantly.

**So!** That isn't gonna work! But as you can see, the support page _still works?_ What kind of magic is that? Why don't I show you?

## scrape-youtube

Let me introduce you to [scrape-youtube](https://www.npmjs.com/package/scrape-youtube). This is a package that basically says _fuck you_ to all the APIs and quota bullshit and just uses the public youtube pages to scrape the info off of them. It's _technically_ optimized for discord bots, but as everything I touch usually devolves into a chaotic discord mess, _close enough right?_

Let me show you a snippet to explain how it works.

```js
youtube.search('lofi hip hop beats to relax/study to', { type: 'live' }).then((results) => {
    console.log(results.streams);
});
```

So, pretty simple right? The first part is the actual search query, something you'd type on the youtube search bar. The _second_ part is the type of results you want. You can leave this one out if you only care about _videos_. On my end though, I need to look for _channels_ and _live streams_. Luckily, those are supported: `type: 'channel'` and `type: 'live'`.

Once you do this, you end up getting a result! This result has _videos, channels, streams, and playlists._ Or movies. Either or. **Anyways!** Now that we've found that, let's go into the step by step explanation on how to use it!

### Step 1: The Setup.

Yeah so this isn't hard. _One thing to note:_ This won't work on the client-side. You need to be on the server-side here. Node and all that. Now that we've clarified that...

So you need to install it by doing `npm install scrape-youtube`. Once you do that, import it by doing something like this.

```js
import youtube from 'scrape-youtube';
```

### Step 2: The Query.
So, I need to get my main channel, live channel, and an active live stream on my channel. Fortunately, _active live streams_ are the only kind of live streams that are retrieved when you do `type: 'live'`, so we don't need to make sure of that.

Anyways. Let me show you the queries.

```js
// For sub count.
const enbyssResult = await youtube.search('enbyss', { type: 'channel' });
const liveResult = await youtube.search('enbyss live', { type: 'channel' });
// For streams.
const liveResult = await youtube.search('enbyss live', { type: 'live' });
```

Pretty simple eh? I mean, if I look up my name directly, then I'm bound to show up. Of course though, it's best to be safe.

```js
const extractSubs = (result, id) => 
  result.channels.filter(channel => channel.id === id)[0].subscriberCount;
const extractStreams = (result, channelId) => 
  result.streams.filter(stream => stream.channel.id === channelId);
```

Here's two small functions. The first parameter is the result you got, so something like `enbyssResult`, the second part is _the channel id in question._ So for me, I pass in the ID of my main and live channel. _This isn't private_, by the way. If you go to any channel, the URL should look like this:

```
https://www.youtube.com/channel/UC88yu6qLzwoM53aXLGHiKJQ
```

That part after `channel/`? That's the ID of that channel. The reason I pass this in is to **make sure** that the result I got is **mine**, and not some other result. Of course this only works if your channel is one of the top 20 results for the query you used, _but honestly_ I'd say that's reasonable enough.

As you can see, `extractSubs` gets the sub count automatically. It also does `[0]`, because once you filter by your channel ID, _you're only gonna end up with one result_. That's a unique ID, it can't exactly be copied, so there you go!

But `extractStreams` stops before the `[0]`! Why? Well let me show you!

### Step 3: I _live_ for this, haha. I'm funny.

So firstly, fun fact, _I'm not always live_ - which means that sometimes a live stream just doesn't exist. So we have to make sure that I'm actually live.

```js
if (liveDetails.length !== 0) {
  // ...
}
```

Yep, pretty easy. If I'm live, there should be one result - _my stream_. If I'm not, well there's no live stream associated with my channel right? So there shouldn't be any. **In other words**, that if block only runs if _**I'm live.**_ So what do I put in it?

```js
var streamTitle;
var streamLink;
var streamWatchers;
var streamThumbnail;

if (liveDetails.length !== 0) {
  streamTitle = liveDetails[0].title;
  streamLink = liveDetails[0].link;
  streamWatchers = liveDetails[0].watching;
  streamThumbnail = liveDetails[0].thumbnail;
}
```

Oh yeah! All the details! Here I'm getting the _title_ of my stream, a _direct link_ to it, the number of _viewers_, and a link to the _thumbnail_. Why a link to the thumbnail? Just incase I want to display it! Not sure if I would, but why not eh? Once I do this, all I need to do is **return the deets!** 

```js
return {
  isLive: liveDetails.length !== 0,
  streamTitle,
  streamLink,
  streamWatchers,
  streamThumbnail,
}
  ```

I need the `isLive` as an easy way of checking that I'm actually live. Of course I can just use the same condition, so there you go!

## That's it?

Mhm! That's it! No fucking with Google systems to get tokens and feel like you're Indiana Jones going through the Matrix, only for the _Matrix trial_ to run out and **blue ball** you. Just use a library, and it works - easy! So yeah, if you were thinking of using the Youtube API because you want to get how many subs you have, or see if you're live, _no need!_

Thank you for reading, fuck Google for its API, and thank _GOD_ for _Dr Kain_.
