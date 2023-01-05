---
title: The Theme Engine - III
description: My grand design that's probably overengineered!
category: articles
image:
    src: 'rebirth/3.theme.webp'
    alt: 'The Theme Engine - III'
createdAt: 2022-08-25
updatedAt: 2022-08-25
---

I always wanted to have theming on my site.

From the moment I started 2 years ago, I knew I wanted to have a dark theme and a light theme. So, I looked into it and - in my inexperience - I bodged something together. The main concept was this...


In CSS, a very large amount of things are inherited. Infact, you can set things based on compound rules.

```css
.dark-theme .container {
    background: black;
}
.light-theme .container {
    background: light;
}
```

Here, the rules apply to `.container` - however said element needs to have an _ancestor_ with a class of `.dark-theme` or `.light-theme`. In this case, such a class would be on the root element - the `<html>` tag.

This is the main principle of theming - apply a root class that will define different styling for everything within it. However, this is _deceptively_ simple. See, with every theme - suddenly everything you include would need to have _double_ the colouring. That 100 line CSS file might end up becoming a 150 line file. Not to mention that each approach - nesting and not-nesting, result in ugly code.

Without nesting, a lot of things that you have will be slapped with the root class over and over again.

```scss
.dark-theme .a {
    //...
}

.light-theme .a {
    // ...
}

.dark-theme .b {
    //...
}
// ....
```

With nesting, sure you avoid writing all those duplicate classes - but everything is indented in, and suddenly each theme's attributes are disconnected.

```scss
.dark-theme {
    .a {
        //...
    }
    // ...
}

.light-theme {
    .a {
        //...
    }
    // ...
}
```

I mentioned _Tailwind_ in the last part. That... kind of avoids this issue with some plugins. However you end up with another issue.

```html
<p class="p-5 m-5 bg-red-100 dark:bg-red-800 ...">
    ...
</p>
```

Did you hate the verbosity? It can get a bit much at times, I'll admit. Now consider that this approach would multiply the amount of verbosity to every element. Frankly, it might even start becoming indecipherable. 

This is, of course, before you even consider extendability. If you wanted to add a new theme in the future, you'd need to trudge every single styling file in order to add css classes - every single place where you have colouring, suddenly needs to be shifted. Not to mention that if you want to manipulate other things - such as _roundness_ - that's even more work.

What this leads to, eventually - is the conundrum I had. I had dark and light themes - and despite wanting to add more, I found that what faced me was a significant mountain of work that, looking at my miserable light theme, might not even result in anything worthwhile. Not to mention - the dark/light button would need to become a dropdown, which is even more work.

Cut to 2 years later. I'm significantly more experienced, I have 2 years of professional work under my belt, and I'm writing my new site from scratch. Originally, the plan was to replicate the site, this time using Nuxt 3, however the _theming problem_ flashed in my mind. I had an _opportunity_ here. If we're rebuilding here - why not go big?

## The Prototype

So, I started thinking. A system needed to be designed here - it couldn't be a haphazard attempt that gets improvised as time goes on - it had to be organized, and its limits had to be known and understood from day 1. I needed to know _what I wanted_, and _what I wouldn't be able to have._ My goals, and my limits. 

So I began. The _root class_ attempt had nothing inherently wrong with it - infact it is the _one_ best way to implement theming. So that went in as part of the design. However, that left the question - _what about the verbosity?_

I'd still need to face and tackle the _verbose_ problem - where styling becomes a monolith of duplications, indentations, or tailwind classes. So, I thought of ways how to make it so that only _one_ class needed to be made for each element - no matter how many themes. And that's when **CSS Variables** came to mind.

```scss
.dark-theme {
    --colour-1: black;
}
.light-theme {
    --colour-1: white;
}
.container {
    background: var(--colour-1);
}
```

I could assign variables to each theme, and then in the styling I simply reference those variables to use them. The example shows the themes in the same file - however realistically the themes could be in their own separate file. This approach would mean that, whenever I wanted to modify a theme - there was _one_ central place I needed to go to. In addition, extending a theme would be as easy as _creating a new class_ and re-setting the variables in there.

Of course, this posed a new problem - _there's a lot of colours_. This approach, by definition, limits the amount of colours we could use to however many variables we decide to declare. In addition, we needed to preserve _contrast_. If `--colour-1` is set to the text, and `--colour-2` is set to the background - then no matter what the theme, these two colours must stay _contrasting_ each other. And so, I created the _Contrast Palette_.

```scss
.dark-theme {
    --main-1: #000000;
    --main-2: #111111;
    // ...

    --contrast-1: #FFFFFF;
    --contrast-2: #EEEEEE;
    // ...
}
```

This gave each theme _2_ groups of colours - with the defining feature being that _every colour in one group, must contrast with the one in the other._ So if I set the background to `--main-1` - I _need_ to use a `--contrast-` colour for the text. In addition, I gave each group **5 colours,** totaling to 10. This felt like a good balance between _too_ many colours, which would increasingly complicate things, and too _few_ colours, which would limit expression. Of course, if in the future I wanted to add more colours - I could simply add more variables.

But of course, why limit to _colours?_ This could work with everything. 
```css
.dark-theme {
    --rounded-sm: 5px;
    --rounded-md: 8px;
    --rounded-lg: 15px;

    --faded-opacity: 80%;

    --main-font: 'Objectivity';

    // ...
}
```

...I wonder if you're seeing a problem here. The more variables we define, the more complex each theme becomes. Whenever we want to create a new theme, we'd need to define more and more variables. _If_ we put too many variables, we'd likely end up duplicating a large number of them. _If_ we don't, however, then we're limiting our expression. Is there some way to set defaults?

Say hello to `:root`.

```CSS
:root {
    --rounded-lg: 15px;
}

.dark-theme {
    --main-1: #000000;
}

.edgy {
    --rounded-lg: 0px;
}
```

This way, if themes do _not_ override the variable, it would just default to the one in `:root`. This way, the `:root` can be _immensely_ complicated with a **lot** of variables, however individual themes can end up as simple as defining their colour scheme and nothing else. So if we want to assign the ticker background...

```css
:root {
    --ticker-bg: linear-gradient(90deg, var(--main-1), var(--main-2));
}
```

...hm. This looks fine right? And yet, there's a fatal flaw.

Our variables are defined in _theme classes_, which are assigned to `html`... and then we're using those variables in `:root`. To explain why this is a problem, let me re-write it in another language.

```python
def function(x):
    number = 5

ten = number + number
```

The variables **aren't in scope.** And infact, when I tried to make this work... it all blew up. The ticker just didn't change.

This wasn't the only issue however. Remember `--faded-opacity`? For each colour, I wanted to have a low opacity version. However, duplicating these values for each colour in the theme felt ugly. Not only that, but I wanted to start using `hsl` instead - due to it allowing for easier colour selection.

::note
`hsl` stands for _Hue, Saturation, Luminance_. The reason why this is preferred is because, if you want red for example, you just set Hue to **0**. Then, if you want to make it brighter, or decrease saturation, you can adjust the other 2 values while _keeping it red._ Using `rgb` or `hex` codes, this would be harder since you'd need to keep the ratios in mind. <br/><br/>

For example, how do I darken #482FA0 _while_ keeping the hue and saturation? Hard right? 
::

As a result, I setup variables to work like this instead.

```css
.dark-theme {
    --m1: 20 100% 20%;
    // ...
}

:root {
    --opacity: 80%;

    --main-colour-1: hsl(var(--m1));
    --main-colour-1-faded: hsl(var(--m1) / var(--opacity));
}
```

You can see the problem. So of course - the solution would be to put these variables _inside_ the `<html>` element. The perfect target turned out to be `<body>`.

```css
:root {
    --opacity: 80%;
}

.dark-theme {
    --m1: 20 100% 20%;
}

body {
    --main-colour-1: hsl(var(--m1) / var(--opacity));
}
```

...and it works! Voila! The theme engine prototype ends up working. Not only that, but it followed my 3 ideals...

- _Structured:_ The engine is very structured, with things being in their right place. Defaults in `:root`, overrides in `themes`, computed properties in `body`. To style an element, we just need to use these variables.
- _Extensible:_ To create a new theme I just simply need to add a new _class_, and set the variables to whatever I like.
- _Organized:_ Because of the structure, I could split things off into separate files - create a `root.css` file, and a `themes/` folder where I put a `.css` file for every theme.

Just one small issue.

## What about Tailwind?

Turns out, when you use variables all over the place, suddenly you can't really depend on tailwind anymore. All those classes - they're not dynamic per theme, and setting them up to be could end up becoming a major pain in the ass. _Not only that_, but then we'd still be stuck with the _verbosity_ problem.

Of course though, Tailwind thought of this. What, you thought _Tailwind_ couldn't be configured?

```js
theme: {
    extend: {
        colors: {
        'main-1': 'var(--main-colour-1)',
        // ...

        'contrast-1': 'var(--contrast-colour-1)',
        // ...

        'main-1-faded': 'var(--main-colour-1-faded)',
        // ...

        'contrast-1-faded': 'var(--contrast-colour-1-faded)',
        // ...
        },
    },
    borderRadius: {
        'sm': 'var(--roundness-sm)',
        DEFAULT: 'var(--roundness-md)',
        // ...
    },
    backdropBlur: {
        'sm': 'var(--backblur-sm)',
        // ...
    },
    fontWeight: {
        "paper": 'var(--paper-weight)',
        // ...
    },
},
```

_Haha!_ Yes! The power of _Tailwind_ is _unquestionable!_ Now you see why I sang its praises - _now_ you can understand why I went into such detail before. Now all I need to do is add `bg-main-1`, and suddenly I can be _certain_ that this colour will be dynamic for every theme. Same goes for all the other attributes - I can just keep extending this file with variables, treating it as a _tailwind_ version of `root.css`. The engine is _infallible-_

## Logic

Hm? Oh that shouldn't be hard. I just need to create a dropdown and...

Goddamnit.

### Dropdown?

This is an aside. Sometimes CSS is a major pain in the ass. Python and Javascript, being dynamic, have a problem where sometimes you look at code and you have no idea what the hell is breaking, why, and in what way. It _isn't_ obvious that the reason why things are breaking is, for example, you passed an _array_ when they actually wanted a _string_. Combine this with libraries, and you can easily get lost.

**CSS** is that, but on _crack._

Things will, 95% of the time, _break_. They will also not do anything, do something inexplicable, randomly cause an effect, or burst your eyes. You are thrust into the desert and only _one_ path will lead you to survival, but you have an entire _360 degrees_ of direction to pick from. That, my friends, is CSS.

...So, when I heard I needed to make a dropdown - I instead said fuck that and installed `headless-ui`.

It's great, comes with unstyled components that perform certain functionality automatically. Unstyled is key, because it means I can add whatever padding, colours, or something in that I want. The _one_ styling it does take off your hands however is _positioning._ Well, it doesn't directly, but the documentation gives you CSS for the dropdown that you can use - so instead of thinking you can just copy and paste it. It's _Tailwind CSS_ too, so no need for funky classes or `style`.

::note
One day I should probably actually look into how dropdowns work. I looked at a video but forgot all of it so, you know. Probably need to watch it again. Oh, and [here's the video](https://youtu.be/IF6k0uZuypA). Or is it [this one?](https://youtu.be/GtL1huin9EE) I love Zero Escape, welcome to my death game - better pick the right one buddy.
::

I won't go into dropdowns, because I didn't really code the logic and it's a pretty small thing - however I did put some effort into it, so maybe I'll do a little highlights update after this series is done. Maybe. If you're interested. You specifically.

Anyways, so that's done - but uh, hey me. Where is this thing gonna be? And that's a good question.

There's no header after all - I want a user to be able to configure the theme from wherever they are. But, I also want to, someday in the far future, have a _/themes_ page where I catalogue all the themes, showing all information as a curated library of CSS. So - what's the one thing that's on every page? _The ticker right?_ Oh we'll get to that - but that's not what I'm talking about. Turning the ticker into a button would be pretty unintuitive, and adding a button would block it, reducing the majesty of the ticker. Can't have that.

Plus hey, I need a place for all the header stuff - like links or whatever.

Say hello to the **Sidebar.**

::page-nav
---
prevLink: "/babel/articles/series/the-rebirth/wwyd"
prevLabel: "What would you do..."
nextLink: "/babel/articles/series/the-rebirth/sidebar"
nextLabel: "Sidebar"
---
::