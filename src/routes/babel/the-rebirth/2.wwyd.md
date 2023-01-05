---
title: What would you do... - II
description: ...if you could do it all over again?
category: articles
image:
    src: 'rebirth/2.wwyd.webp'
    alt: 'What would you do... - II'
createdAt: 2022-08-23
updatedAt: 2022-08-23
---

In the beginning, there was the _main_ branch. And when the bells rang, and the inspiration tolled, the birth of _recreation/nuxt3_ became true.

Today, we will revisit the first document that I published on this site - understand everything that I did, and how to recreate the whole thing better. Just incase you haven't seen it - [here you go](/babel/article/the-beginning). It's pretty long apparently, and some things in it are... kinda wrong? But y'know, it was the beginning and I was much different back then.

So, read it? Good. Haven't? No worries. Let's go.

## The Same

First, of course, let's start with what we're keeping. 

### Nuxt.js
  
yeah, obviously. The 3rd version was the whole reason I wanted to do this again, it would be pretty weird if I went away from it. Maybe in the future when I mess with other technologies - but this was such a time investment, that I don't know whether I'd recreate my site in _another_ framework. Maybe parts of it. Maybe.

### TailwindCSS - A tangent
  
honestly this is just really good. Back then, I used **Version 1**. By the time that I decided to redo everything, **Version 3** had come out. There's been some _cool_ things I've missed, but even ignoring that, it's a vitally useful library. I'm not _hardcore_ - sometimes I stick to using CSS classes - but most of the time it's really nice to just have the CSS be a structured part of the HTML.

really quickly - say you wanted to make a nice-looking button. You likely want to give it a _background_, some _padding_, and maybe even make it _larger_ when you hover over it.
you can do this in three ways:

_The inline-approach:_ Also known as the _why_...

```html
<button style="background: red; padding: 5px;">
    Button...?
</button>
```

You might notice there's nothing about making it larger. Yeah you can't have `:hover`, or any selector for that matter. _`style=...`_ has its uses, but most of the time _(99.9%)_ you probably want to go _the `<style>` approach_...

```html
<button class="nice-btn">
    Button!
</button>

<style>
.nice-btn {
    background: red;
    padding: 2em;
    transition: all 200ms ease;
}

.nice-btn:hover {
    transform: scale(1.1);
}
</style>
```

That's a _lot_ more code! But that's not a bad thing - everything's more organized, especially if you want to use `.nice-btn` anywhere else. You probably do too - consistency is one of those things that is nice to have. Makes the whole design work together y'know? But still, you can easily end up with a monolith of _CSS_. 

What you could do instead, is define a group of _classes_ that each store a single attribute. Then whenever you want to style anything in your website, you can just slap on these _utility classes..._

```html
<button class="bg-red padding-5 transition-ease-200 grow-on-hover">
    Button!
</button>

<style>
    .bg-red {
        background: red;
    }

    .padding-2 {
        padding: 2em;
    }

    .transition-ease-200 {
        transition: all 200ms ease;
    }

    .grow-on-hover:hover {
        transform: scale(1.1);
    }
</style>
```

Well, we're increasing in size! However, now we can look at the classes on the button and _understand_ what styling is applied on it. It's the middleground between _`style=...`_ and _`<style>`_ - you can look at the element and know how it's styled, _and_ it's reusable in other places while being less verbose. But defining your classes can end up being pretty annoying, and _that's_ where **Tailwind** comes in.

```html
<button class="bg-red-800 p-5 transition duration-200 ease transform hover:scale-110">
    Button!
</button>
```

It comes with a _lot_ of utility classes that you can apply to elements in order to style them. However, it also comes with a lot more things as well:

- _Modifiers_: Want to make something activate on hover? Slap `hover:` before it! Pressed? `active:`!
- _Responsiveness_: Maybe I want something to be 800px wide on big screens `lg:w-[800px]` but as wide as the screen on smaller screens `w-full`
- _Customizeability_: Wanna use different colours or styling that tailwind doesn't offer? _You can add 'em!_
- _Arbitrary values_: What if you want something to be exactly `582px`? You can just add square brackets! (`w-[582px]`)

Hopefully you can see why I like Tailwind. By the way, I didn't go this much in detail just to explain. The next part will go deeper into styling, and some understanding of how Tailwind is cool can help you appreciate some things that're gonna happen there.

And that's all!

## The Different

Yep, a lot of other things have changed. Mostly things I didn't mention in the article, but that I personally want to go into here. Reason why they weren't there is likely both because _I kinda rushed that doc out_, and _some developments happened later._

I'm not going into all of them, and I'm not going that deep in detail either. This series is _all_ about the _new_ and _different_, and I'm not going to stuff it all in here. Instead, this page is moreso meant to serve as a taster of what's to come.

To put it another way, _Part 1_ was the introduction. _Part 2_ is the orientation video.

### SASS?

You know, I really sang high praises of _SASS_ last time, but honestly? What did I do with it? Nesting??

Don't get me wrong, _SASS_ is really cool - but frankly I didn't really use any of the actual features in it. Didn't use variables, nor loops, or mixins _(whatever they are...)_ - I **just** used nesting.

Now honestly, I did start out deciding to use _SASS_, but in the _refactor_ process it just couldn't work and in the process of finding an alternative, I stumbled onto _PostCSS_.

The funny part is that with my _re-creation_ project and all, I could have just stuck with **SASS** - however it seems like _Nuxt 3_ includes use of `PostCSS`. When I looked into it, that's when I found out what it actually was.

See, it's an extension of _CSS_ that uses _plugins_ to add functionality. As a result, you can pick and choose what to incorporate, rather than be saddled with this big chunk of functionality you'd likely not use. In my case - I find `postcss-nesting`. Guess what, it adds nesting.

Also guess what. It's _disappeared._

#### A Horror Story?

Yeah okay, so I wanted to look back at how I actually installed this thing and incorporated it, when I found out that it's just... gone. It's not in any of my configurations or dependencies - the only mentions of it are in the `package-lock.json` file which is an archive of every single dependency you're using as well as _its_ dependencies. Mostly helpful so that if you want to set this project up, you're _positive_ that the same dependencies are being used.

Of course, that leaves one question - _why's it there?_ Well, it's a part of _Tailwind._ Yeah so uh, apparently tailwind offers a plugin for nesting that _uses_ this plugin in order to make their ~special~ annotations like `@apply` work. Trouble is, you're supposed to _install and configure it._ I haven't done that, so what's happened? Easy. Ghosts.

Okay I don't actually know what happened, but I guess now I have a ghost dependency in my project. Hopefully my site isn't haunted.

Anyways yeah - I use PostCSS _just_ for nesting. There's probably more plugins, but for now at least - I'm not really interested. Though maybe I should look at it. Be on the lookout for a future article that calls me an utter fool for not doing that.

### Header?

Yeah, so that's missing huh? Remember the header - that big old thing at the top that had a logo and some buttons? So that's no longer there. The reasoning is mostly an internal conflict between _headers_ and _sidebars._

The _Sidebar_ is getting its own part - albeit probably a small one, but I'll do a very quick elaboration for now.

Basically - the header wasted a lot of space, while also not having enough of it. I could put buttons on it, but to make the thing have any functionality on mobile I had to slap on, badly design, and botch together a _hamburger menu_ - aka that thing with 3 lines you press to open up a laundry list of options.

That thing sucked to implement, not to mention that I just kinda don't like hamburger menus. So, instead, I added a sidebar.

Implementing it sounded easy, making it reactive for mobile comes for free because... it's a collapsible sidebar - and also it has a _ton_ more space to fill in, not to mention that I could probably make the dang thing scrollable.

Spoiler alert though, thing was a bit of a mess. Works great now, but boy oh boy did it have some funny bugs.

...ticker is still there though. I'll never abandon the ticker. Although I did do something with it... more in the API part.

### Theming

The old site had 2 themes. The designed one, and the garbage one.

No, I'm not making a _light mode sucks_ joke - I'm calling my design of the light mode a joke.

Look, I'll be real with you - I added light mode for accessibility but because I didn't... really know how to make light mode look nice, and kinda didn't care too much to make it into eyecandy, I ended up making an eyesore.

I mean the thing wasn't _garbage_ - but it was pretty damn close, and you could easily tell that it was slapped together just as an excuse to say I have a light mode.

So I entered **version 2** with a goal in mind. I wanted to make it so that theming followed these core principles:

- _Structured:_ The thing needs rules, design, actual thought put into it so that the whole thing makes sense together and looks nice.
- _Extensible:_ I needed to be able to add themes very easily. That way, if I wanted to add a new look to my site, I could do so without too much effort.
- _Organized:_ No, this isn't the same as _Structured._ I needed to organize each theme so that its attributes are _easily_ found. In other words, the information on each theme had to be _standardized_ and kept in as _few spaces as possible_ - so that if anything goes wrong, or I just want to fix a theme - I can.

This was the first thing I did before anything else. I started working on making this whole thing _work._

And so, the _Theme Engine_ was born.

::page-nav
---
prevLink: "/babel/articles/series/the-rebirth/intro"
prevLabel: "The Rebirth"
nextLink: "/babel/articles/series/the-rebirth/theme"
nextLabel: "The Theme Engine"
---
::