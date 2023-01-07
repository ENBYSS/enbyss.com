---
title: Herring Reveals And Signs (X)
description: A popular tool used to show Herring updates, be they freshly revealed messages or ones close to being revealed. (Decommissioned)
category: doc
tags:
    - blaseball
image:
    src: 'docs/blaseball/herring-reveals.png'
    alt: 'Herring Reveals'
createdAt: 2022-12-21
updatedAt: 2022-12-21
---

I didn't expect this tool to get as popular as it did, but at the same time I likely should have. Effectively it served as a user interface for people who wanted to be *in the know* for new events that have occurred.

# The Herring Mechanic

So first a refresher - during the Expansion Era there was the *Library* - a collection of redacted books that hosted lines of history from Blaseball long ago, *before* the internet series. How were they unredacted? Well uh... bear with me.

## The Peanuts

First we start with **The Peanuts** - a currency fresh from the Discipline Era. You could buy them by the hundreds and for the longest while they did next to *nothing*. Soon though they could be used to give *tribute* to teams in the **Hall Of Flame** - the hall of players long turned ash. Then they gained another use - **upnutting** events.

**Upnutting** basically means giving a peanut to a *feed event* - the more peanuts it gets, the more *popular* and *featured* it is - which meant that the most interesting events were featured for people to see when they came back. Really nice feature, but there was also a secret hidden within.

Stay with me now.

## The Investigation

Two players, **Uncle Plasma** and **Liquid Friend**, were unique in that they had the **Hard Boiled** modifier. They were introduced by the siesta-based *Coffee Cup*, which had a definitely-inconsequential season of blaseball with all the known players *(grouped by coffee preference)* and new teams such as the **BC Noir** which hosted the aforementioned **Hard Boiled** players.

There was also the **Data Witches** (shoutout to SIBR) but *ahem*.

Anyways, at some point players started getting **Redacted** and certain stadiums were turning into **Crime Scenes** - meaning that whenever **Uncle Plasma** and **Liquid Friend** visited, they'd *Investigate* and potentially find something - marked by **feed events**.

I'm omitting a [lot](https://www.blaseball.wiki/w/Season_21#Go_Long) of [details](https://www.blaseball.wiki/w/The_Investigation) because well, it's the Expansion Era and I'm already derailing this article from its purpose of documentation. The important part are these **feed events.**

See, whenever a feed event that represented an *investigation result* was **upnutted**, it gave the user a **Red Herring**. These worked *like* the upnut mechanic, except this time they could be used on **redacted book events**.

The result was that everyone had a limited supply of Red Herring based on how many investigation events they could upnut, and then they spent said Herring on the redacted events with the most potential in order to *not* waste them. There was quite a lot of co-ordination for this infact, including analyzing the redactions themselves and *guessing* what they could be hiding.

::note
Red Herring came from **Blaseball 2** - a nebulous *"sequel"* which hosted a gate. Said gate broke because we slammed dummy thick players into it and, upon opening, unleashed a torrent of red herring.

How did we do that? Uh... [here you go](https://www.blaseball.wiki/w/Blaseball_2) - this should help I think.
::

# The Actual Documentation
So, with all this unredacting going on, it'd be nice to see all the newly revealed events *and* the ones that are close, so people can upnut and contribute to the last push. Let me introduce, the *Herring Revealer*!

This tool had **two modes**:
- **Reveals:** Shows off all of the revealed events, sorted in descending order based on date of reveal.
- **Book Leaderboard:** Shows the top 50 *redacted* events that are currently close to being revealed.

It also had two *hugely* important dependencies - **Eventually** by Allie and **Upnuts** by Brella.

- **Eventually** provides a very useful API for searching through the Blaseball Feed. It was *invaluable* for the leaderboard, since I needed to actually browse the feed itself in order to get the events.
- **Upnuts** is a system that takes note of *many* things surrounding **upnuts** *and* **Red Herring**. It could be used both as a way to track all events that passed the *unredaction threshold* - **and** accessing library data.

Without these two and their services - this tool *would not* exist. In essence I simply merged them to provide a Web UI for users to go through. But *how* did I use them? Ah, well let's get into the code.

First we have the *initial data*:

```js
{
    upnuts : {},
    playerMap : {},
    teamMap : {},
    filters : ['all', 'games', 'books', 'players', 'teams'],
    currentFilter : 'all',
    currentMode : 'reveals',
    top50scaled : [],
}
```

Firstly, `playerMap` and `teamMap` here are initialized via an API call, in order to be up to date.

```js
async function initPlayerMap() {
    let allPlayers = await this.$axios.get("https://api.sibr.dev/corsmechanics/www.blaseball.com/database/playerNamesIds");
    let playerIdToNameMap = {};
    allPlayers.data.forEach(el => playerIdToNameMap[el.id] = el.name);
    this.playerMap = playerIdToNameMap;
},
async function initTeamMap() {
    let allTeams = await this.$axios.get("https://api.sibr.dev/corsmechanics/www.blaseball.com/database/allTeams");
    let teamIdToNameMap = {};
    allTeams.data.forEach(el => teamIdToNameMap[el.id] = el.fullName);
    this.teamMap = teamIdToNameMap;
},
```

This was generally only used in order to match each ID to the relevant team name - since we didn't need any details other than that.

Then there's the `filters` - used so that people could only see events of *interest*. The way these filters worked is by essentially going through the **upnuts** data and only showing items based on attributes. For example:

- **game** feed events had `gameTags`.
- **book** feed events had a library link in `libraryHref`.
- **player** feed events had `playerTags`.
- **team** feed events had `teamTags`.

Of course an event can have multiple of these - however these are set in order of *importance* - for example if an event affects someone on the Miami Dale, you'd likely have both `playerTags` and `teamTags` - but it's treated as a **player** event, because the `playerTags` take precedence.

```js
upnutsToDisplay() {
    if (this.currentFilter === 'all') {
        return this.upnuts;
    }

    const filterCheck = (event) => {
        const arrayEmpty = array => array == undefined || array.length === 0;
        if (this.currentFilter === 'games') {
            if (!arrayEmpty(event.gameTags)) return true;
        }
        if (this.currentFilter === 'books') {
            if (event.libraryHref !== undefined) return true;
        }
        if (this.currentFilter === 'players') {
            if (!arrayEmpty(event.playerTags)) return true;
        }
        if (this.currentFilter === 'teams') {
            if (!arrayEmpty(event.teamTags)) return true;
        }
        return false;
    }

    return this.upnuts.filter(el => filterCheck(el));
}
```

The logic is quite simple, and discerning it was as easy as looking at an event for each type and seeing the differences.

The other data meanwhile, is either self-explanatory (`currentMode`) or significantly more complicated (`upnuts`, `top50scaled`).

## Leaderboard

Starting with the simpler of the two is the *leaderboard*. Here's the **vue** code for the actual leaderboard template itself.

```vue
<template>
    <!-- .... -->
    <div class="scaled-event my-2 p-2" v-for="(event,index) in top50scaled" :key="'scaleEvent' + index" :style="upscaleToStyle(event.scales)">
        <p class="event-ranking text-xl"> {{index+1}}. </p>
        <p class="event-scales text-xl font-bold italic mx-2"> {{event.scales}} </p>
        <p class="event-time font-bold"> Season {{event.season}}, Day {{event.day}}</p>
        <p class="event-name italic mr-3"> {{event.bookTitle}}, {{event.chapterTitle}} </p>
        <a class="event-link italic font-bold" :href="event.libraryHref"> Link </a>
    </div>
</template>
```

I've omitted some vue specifics like the `v-else` to focus on the logic. If you're not familiar with vue, don't worry. I'll try to explain in a platform-agnostic way.

Here you can see I'm iterating over `top50scaled` - one of the two variables I mentioned. This hosts all the data that I'll need for displaying the leaderboard, infact I'm only using its attributes. So how is it being set?

```js
async function getTop50ScaledEvents() {
    let top50Herring = await this.$axios.get("https://api.sibr.dev/eventually/events?metadata._eventually_chapter_id=exists&metadata.redacted=true&limit=50&sortby=%7Bmetadata,scales%7D&sortorder=desc");
    let libraryData = await this.$axios.get("https://api.sibr.dev/upnuts/library");
    const top50leaderboards = top50Herring.data.map(el => {
    const bookIndex = libraryData.data.findIndex(book => book.bookTitle === el.metadata['_eventually_book_title']);
    const chapterIndex = libraryData.data[bookIndex].chapters.findIndex(chapter => chapter.chapterTitle === el.metadata['_eventually_chapter_title']);
    return {
        day: this.generateDay(el),
        season: this.processSeasonNumber(el.season),
        bookTitle: el.metadata['_eventually_book_title'],
        chapterTitle: el.metadata['_eventually_chapter_title'],
        scales: el.metadata.scales,
        libraryHref: `https://www.blaseball.com/library/${bookIndex}/${chapterIndex+1}`
    }
    })
    this.top50scaled = top50leaderboards;
}
```

This is the function that sets the data up. As you can see, I'm doing a request to `eventually` to retrieve the value for *top50Herring* - which yes, stores the top 50 redacted events. Looking at the URL, you can see a large number of filtering - infact I'll break it down:

```
https://api.sibr.dev/eventually/events?
    metadata._eventually_chapter_id=exists&     (must have a chapter id [is book event])
    metadata.redacted=true&                     (must be redacted)
    limit=50&                                   (only send 50)
    sortby=%7Bmetadata,scales%7D&               (sort by scales [red herring])
    sortorder=desc                              (in descending order [most first])
```

::note
`%7B` and `%7D` above are *url-encoded* versions of `{` and `}`. In other words, the actual value of `sortby` is `{metadata,scales}` - however since you can't use `{}` in URLs, they need to be encoded.

Documentation of *eventually's* API can be found [here](https://docs.sibr.dev/docs/apis/b3A6MTcxMzQxMTA-events)
::

The resulting data from that API request is a list of events, of which we use the following fields:
```ts
type Event = {
    day: number
    phase: number
    metadata: {
        _eventually_book_title: string
        _eventually_chapter_title: string
        scales: number
        redacted: true
    }
}
```

Now we have most of the information we need, but there's a crucial part we still don't have. **The link**. The formatting of the url for each chapter looked like the following:

```js
`https://www.blaseball.com/library/${bookIndex}/${chapterIndex+1}`
```

But in order to get these indices, we need to get the *whole* library. That's why we then follow up the `eventually` request, with an `upnuts` one:

```js
let libraryData = await this.$axios.get("https://api.sibr.dev/upnuts/library");
```

We don't need much information from here, apart from the *title* itself to compare with the events we received - so the useful schema ends up looking like this:

```ts
type Book = {
    bookTitle: string
    chapters: Chapter[]
}

type Chapter = {
    chapterTitle: string
}

type Response = Book[]
```

So now we can combine the events and the library data to form a result!

```js
const top50leaderboards = top50Herring.data.map(el => {
    const bookIndex = libraryData.data.findIndex(book => book.bookTitle === el.metadata['_eventually_book_title']);
    const chapterIndex = libraryData.data[bookIndex].chapters.findIndex(chapter => chapter.chapterTitle === el.metadata['_eventually_chapter_title']);
    return {
        day: this.generateDay(el),
        season: this.processSeasonNumber(el.season),
        bookTitle: el.metadata['_eventually_book_title'],
        chapterTitle: el.metadata['_eventually_chapter_title'],
        scales: el.metadata.scales,
        libraryHref: `https://www.blaseball.com/library/${bookIndex}/${chapterIndex+1}`
    }
})
```

That's where `libraryHref` comes from - but then there's the `day` and `season` which are handed off to other methods. Essentially, this is because of two factors:

- Some days are **special**, like *Gods Day*, or the *Earlsiesta*. It doesn't just go from 1 to 100, these events insert themselves into the range as well.
- Seasons aren't exactly... numbered as you expect. Since the entries in the book are *prehistoric*, the season numbers start becoming unconventional.

### Parsing The Day
So, let's look at `generateDay(...)`.

```js
generateDay(el) {
    if (el.phase === 0) {
        return 'G';
    }
    else if (el.phase === 5) {
        return 'LS';
    }
    else if (el.phase === 3) {
        return 'ES';
    }
    else if (el.phase === 13) {
        return 'EL';
    }
    else {
        return el.day + 1;
    }
}
```

Here's when *phase* comes in. See, **day** represents a game day - but **phase** represents a specific time event, and if something took place in the middle of the *Latesiesta* then it would be confusing to just say `Day 72` - for example. However, these are *numbers* - how do we know what they actually represent? Well,
the [wiki](https://www.blaseball.wiki/w/SIBR:Feed#phase) notes down the meaning of each number:

| Phase | Name |
| ----: | :--- |
| 0 	| Rest / Gods' Day (G) |
| 1 	| Preseason |
| 2 	| Earlseason |
| 3 	| Earlsiesta (ES) |
| 4 	| Midseason |
| 5 	| Latesiesta (LS) |
| 6 	| Lateseason |
| 7 	| Endseason |
| 8 	| PrePostseason |
| 9 	| Earlpostseason |
| 10 	| Earlpostseason End (Wild Card Evening) |
| 11 	| Latepostseason |
| 12 	| Postseason End |
| 13 	| Election (EL) |
| 14 	| Special Event (Boss Battle, etc) |
| 15-18 	| Tournament (details unknown) |

The reason why I went for **0, 3, 5, 15** specifically is because they're the phases in which these events usually (if not always) happen. Infact, they're labelled with the short version **(G, ES, LS, EL)** - which is what they'd show up as in the feed.

If the phase doesn't match one of the chosen - then we just return the `day + 1` - because it's 0-indexed.

### Parsing the Season
Now this is where things get a big weirder.

```js
processSeasonNumber(season) {
    if (season >= -1) {
        return season+1;
    }
    else if (season === -88) {
        return 'α';
    }

    let adjustedSeason = season + 99;

    if (adjustedSeason >= 0 && adjustedSeason < 5) {
        return String.fromCharCode(adjustedSeason + 65);
    }
    else {
        return 'A' + String.fromCharCode(adjustedSeason - 5 + 65);
    }
},
```

So, the first part is simple, if the season is *positive*, then we just return it `+1`. Otherwise, it's one of the *historical* seasons.

Now, the **beginning** of blaseball - meaning before games started - is marked as **Season -88**. This seems like a specially chosen number - and to represent it I just returned $$\alpha$$.

In any other case, it's a normal *prehistoric* season - starting from **-99**. These are represented via letters in blaseball - and converting numbers to letters is one of those things that you learn ASCII for.

For example, let's say the season is **-99** - the very first one. I add **99** to it, turning it into 0. Now, in [ASCII](https://www.asciitable.com/), the code for `A` is **65**, so all we need to do to get that is just add `65` and turn the number into a character.

The reason why ASCII is helpful can be seen with the other 4 seasons (`B, C, D, E`) - whose codes are `66, 67, 68, 69`. So, evaluating all `adjustedSeason` values for the first block:

| Expected Season | Adjusted Season | `+99+65` | Returned |
| --------------: | :-------------: | :------: | :------- |
|             -99 |        0        |    65    | A        |
|             -98 |        1        |    66    | B        |
|             -97 |        2        |    67    | C        |
|             -96 |        3        |    68    | D        |
|             -95 |        4        |    69    | E        |

However, after **Season E** blaseball effectively restarts, now starting from **Season AA**. That is the reasoning behing the if check - and why in the else block we then use the code `adjustedSeason - 5 + 65`.

| Expected Season | Adjusted Season | `+99+65-5` | Returned |
| --------------: | :-------------: | :--------: | :------- |
|             -94 |        5        | $70-5=65$  | AA       |
|             -93 |        6        | $71-5=66$  | AB       |
|             ... |       ...       |    ...     | ...      |

And with that, we've completed the explanation for the *leaderboards*.

## Reveals

But we're not done. Now come the reveals, and these have a lot more cosmetic polish applied to them - which makes the **vue** code more complicated. For the sake of documentation, I'll stick to the event *itself*.

```vue
<template>
    <!-- ..... -->
    <div v-for="(event, index) in upnutsToDisplay" :key="'event' + index">
        <div v-if="timeIsWithinPast24Hrs(event.rawTimestamp)" class="recent-alert italic">
            < 24hrs ago!
        </div>
        <div class="upnut-event" :class="timeIsWithinPast24Hrs(event.rawTimestamp) ? 'recent-event' : ''">
            <p class="font-bold">Date revealed: {{ event.eventDate }}</p>
            <p class="italic">Date of event: {{ event.created }}</p>
            <div class="text-2xl font-bold italic">
                <span>Season {{ event.season }}</span>,
                <span>Day {{ event.day }}</span>
            </div>
            <p class="text-xl italic event-description">
                {{ event.description }}
            </p>
            <!-- https://www.blaseball.com/player/948ce8a8-19cd-4f81-b84f-88cce02c47bc -->
            <a v-if="event.libraryHref" :href="event.libraryHref" class="tag book-tag"> Book </a>
            <a :href="`https://www.blaseball.com/game/${tag}`" class="tag game-tag" v-for="(tag, index) in event.gameTags" :key="'gametag' + index">Game {{ index }}</a>
            <a :href="`https://www.blaseball.com/player/${tag}`" class="tag player-tag" v-for="(tag, index) in event.playerTags" :key="'playertag' + index">{{ playerMap[tag] }}</a>
            <a :href="`https://www.blaseball.com/team/${tag}`" class="tag team-tag" v-for="(tag, index) in event.teamTags" :key="'teamtag' + index">{{ teamMap[tag] }}</a>
        </div>
    </div>
</template>
```

::note
Don't be alarmed - you don't need to understand this code. The important part is this:

```vue
<div v-for="(event, index) in upnutsToDisplay" :key="'event' + index">
    <!-- .... -->
</div>
```

...which is the loop we're getting the data from. Everything else is just us using said data to construct some **HTML**.
::

**So!** Here we're extracting the events from `upnutsToDisplay` - which is a more processed version of `upnuts` - the variable holding the actual data - and that data is retrieved using the following function:

```js
async function getUpnutData() {
    let upnut = await this.$axios.get("https://api.sibr.dev/upnuts/upstream");
    let result = upnut.data.filter(el => el.type === 'THRESHOLD_PASSED_SCALES').map(el => this.processUpnutEntity(el));
    this.upnuts = result;
},
```

This one looks *deceptively* simple - we just use **upnuts** to get the freshly revealed events, who have a type of `THRESHOLD_PASSED_SCALES`. Infact, let's look at the schema of the important parts in an event here:

```ts
type UpstreamEvent = {
    time: number
    type: "THRESHOLD_PASSED_SCALES"
    event: {
        day: number
        phase: number
        season: number
        created: string
        gameTags: string[]
        teamTags: string[]
        playerTags: string[]
        metadata: {
            _upnuts_hrefs?: string[]
        }
        description: string
    }
}
```

Lots of details here! `day`, `phase`, and `season` all look familiar and are handled similarly as well. `gameTags`, `teamTags`, and `playerTags` are also all familiar and used for filtering - though we also use these for *displaying* said tags (see the vue template).

That leaves some fields, but first - let's look at `processUpnutEntity(...)`

```js
processUpnutEntity(upnut) {
    var libraryHref;
    if('_upnuts_hrefs' in upnut.event.metadata) {
        libraryHref = upnut.event.metadata['_upnuts_hrefs'].find(element => element.includes('/library'));
    }
    return {
        eventDate: this.formatDate(new Date(upnut.time)),
        day: this.generateDay(upnut.event),
        rawTimestamp: upnut.time,
        season: this.processSeasonNumber(upnut.event.season),
        created: this.formatDate(new Date(upnut.event.created)),
        playerTags: upnut.event.playerTags,
        teamTags: upnut.event.teamTags,
        gameTags: upnut.event.gameTags,
        description: upnut.event.description,
        libraryHref
    }
},
```

So! First we see `libraryHref` making an appearance again - this time instead of manually generating the URL, it's handed to us in the `_upnut_hrefs` field. This field has *multiple* links though, and the one we care about here is the one that points to a library entry - by checking for `/library`.

After that, we reorganize the data for use - we've seen how fields like `day`, and `season` get processed, the `tags` are just returned - with each tag being the **ID** of whatever its pointing to *(used in the `teamMap` and `playerMap` to turn into the actual name)*. `description` is just the unredacted feed event - something like `Megan Ito broke the Universe` or `Parker MacMillan killed everyone oops` - which leaves the *dates*.

Now, `upnut.time` is a *UNIX* timestamp `(1639648925502)` and `upnut.event.created` is an ISO string `("2021-06-20T18:01:01.078Z")` - both of which can be passed into `new Date(...)` to turn into a date object, which is *then* formatted using `formatDate(...)`:

```js
formatDate(date) {
    const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    }
    return date.toLocaleDateString("en-US", options);
}
```

[`toLocaleDateString`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) is a native JS method on dates, and the options are pretty easy to configure. An example of a date with the above formatting is `28 Feb, 2021, 3:56:28PM` - I should have added `hour12: false` as well, but this was a long time ago.

And with that, we now have all the data needed for the UI!

# Conclusion

This was *a lot* to write, and pretty complicated too. Like I said in the article before, this was way back - when I was still writing messy code with Nuxt2. Now I'm writing *slightly* less messy code with Nuxt3, so hopefully when the new Era comes, I'd write tools better.

Hope this was *understandable* in any way! Tried to be clear but at the same time it's a bit hard to explain complicated code while bypassing the framework sometimes. Especially with Nuxt 2 which has the annoying `Options API`.

documentation is hard