---
title: The Rebirth - I.
description: We're doing it again.
category: article
series:
    name: rebirth
    part: 1
image:
    src: 'the-rebirth.png'
    alt: 'The Rebirth - I'
createdAt: 2022-08-20
updatedAt: 2022-08-20
---

Hey! Been a while since I wrote something. You might be noticing that things are a bit outta whack. That's normal. I've rebuilt my whole entire site afterall.

_Why'd I do that?_ Welp, that's what we're getting into. But that's not the only thing. I want to get into how I did it, and explain that too for the technical people who are curious. Although, I do want to say that I'm no professional web developer.

My work is strictly in the backend, but this site was a challenge of sorts from me to learn how to do frontend. Looking at what I managed to cook up, I feel proud of it honestly. But at some point I felt like it got a bit... stale, you know?

See, the whole thing was built like crap. It was a hodgepodge of code mixed together with barely a thought about maintainability or how it looked, or hell - even how it performed. This is mostly cause I started this site 2 years ago - and _let me tell you_,  2 years is a hell of a lot in programming.

Of course I still kept it. I'm busy and I didn't feel **THAT** great a stagnation to just up and do something about it, so I just let the site be and do its own thing. And then came...

## Nuxt 3

For those who don't know, let me give you the layman's version. My old website used a thing called _Nuxt 2_, which is a _framework_. Frameworks usually add a **significant** amount of features that can completely transform how you program.

To go a bit deeper, _Nuxt 2_ was founded on _Vue 2_, which is what I call a _"lower-level" framework_. I call it this because well, _it is a framework_, it fundamentally changes how web development works - but it also has frameworks _built on top of it._ So, to refresh:

- All web development starts with _Javascript, HTML, and CSS_
- Then you have a _framework_ that changes how you use those things.
- _Then_, you can have a framework _built on top_ of that one that changes how you use certain things in _that_ framework.

It's a bit esoteric to try and explain this in layman's terms, so I hope it worked. If it didn't - don't worry it's not important. I just wanted to go into that a bit just incase because it feeds into what's coming next.

### Breaking Changes

See, _Nuxt 3_ is a **major** upgrade. **Major** is a keyword there, not an adjective - it means there's _breaking changes._

Breaking changes means that your old code just won't work with this new version. So let me show you a quick example of a breaking change.

```python
# version 1
def add(n1, n2):
    return n1 + n2

add(1, 2)
```

A simple add function. But, maybe we want to print what the numbers are before we return them right?

```python
# version 1.1
def add(n1, n2):
    print(f"n1: {n1}, n2: {n2}")
    return n1 + n2

add(1, 2)
```

This is what we call a _minor_ upgrade. We added functionality to our existing code, but whoever was using the old version could still just transition to using this one. `add(1, 2)` will still work like we expect.

But then we say, adding two numbers is too easy. I want to return a _sum_ of all numbers that are being passed. So for this, I wanna use a list. 

If you know python, you know `*args` exists, but stay with me here.

```python
# version 2
def add(nums):
    sum = 0
    for num in nums:
        sum += num
    return sum

add(1, 2) # breaks!
```
And here we have a _breaking change._ This change has a potential to break any number of code that depends on it, since we now accept a list instead of just 2 numbers.

Breaking changes are something significant, so when a thing would cause it, usually you try and find alternatives. For example here, there's two alternatives I could do.

```python
# version 1.2 [1]
def add(*args):
    sum = 0
    for num in nums:
        sum += num
    return sum

# version 1.2 [2]
def add(nums):
    sum = 0
    for num in nums:
        sum += num
    return sum

def add(n1, n2):
    return add([n1, n2])
```

Both of these implement the _new functionality_ without breaking _old code_. Sometimes you end up with case 1 - where the alternative is just better. But sometimes you end up with case 2 - where you add extra functions just for compatability.

And these can add up.

<Note>

`*args` means _any number of parameters_. It gets treated as a list, but you can just pass them as normal parameters.

</Note>

### Major Release

So, at some point you want to just think big. No longer constrained by the need to be backwards compatible, and able to just achieve some big plays in your project. That's why _Major Releases_ happen - sometimes you just need to vastly improve/update the experience.

And that's what **Nuxt 3** is. A massive upgrade. Mind you, it's not _fully ready_ yet - all we have are _release candidates_, aka versions that are incredibly close to release but still have some issues to iron out. In other words, you can adopt these and be confident that when the full thing's ready you won't have some major changes to make.

So I wanted to use it. A lot. It had some pretty interesting features and I wanted to play with them. Especially the upgrade to _Vue 3_, which introduced a different way of writing logic for components. Also - _native typescript support_. I'll never not champion the values of static typing.

<Note>

Static typing is when the type of each variable is known at compile time. Compare JavaScript to TypeScript for example...

```js
let x = 5;
let y = (z) => z*2;

y(x);
```

```ts
let x: number = 5;
let y = (z: number) => z*2;

y(x)
```

You don't need to declare all types, some infact are _inferred_, but this means your code is significantly less likely to produce confusing bugs due to changing types.

</Note>

Just one problem - major upgrades mean major refactors. That's where _Nuxt Bridge_ comes in.

## Nuxt Bridge...?

This is for people who wanted to upgrade. It's meant to provide a bridge from _2_ to _3_, allowing them to use certain features to 3 and slowly migrate without breaking everything completely. You install it, and then start the process! However, the documentation wasn't 100% and even then, the migration issues would likely be highly personal to your case - so it's still a sort of no man's land.

In any case - _I probably did it wrong._ Like, completely. Let me explain.

See I thought it was plug and play, I just followed the instructions [laid out here](https://v3.nuxtjs.org/bridge/overview) and thought it'd be that simple. So, first came updating the depenedency...

```diff
- "nuxt": "^2.15.0"
+ "nuxt-edge": "latest"
```

Then _Nuxt Bridge..._

```sh
npm install -D @nuxt/bridge@npm:@nuxt/bridge-edge
```

And _errors._ Oh so many errors. Everything started breaking all at once. Thing wouldn't even build let alone start.

I probably spent entire days trying to fix the issues, but with every issue I fixed, 3 more popped up. It was like fighting a super powered hydra. Every issue provided no help when searched for too - I was in uncharted territory.

This is when I bring the fact that - it was 2 years ago when I started this site. And I didn't exactly structure things in the best way. The thing was a labyrinthine apocalypse of incomprehensible javascript, tangled together with a format that made it all impenetrable.

The code was a monolith, a testament to the level of inexperience I was at. Mind you, I still did some impressive things in said state - but _dear god_ did it bite me back in the ass.

Trying to fix all of this was like trying to fix a burning building. The thing wasn't going to function. I even went through the stages of grief while trying to fix all of this. I couldn't accept how screwed this whole thing was, then I got pissed at all the errors, after that I tried fixing them one by one, and then I fell into a slump as I realized... _yeah this wasn't going to work._

And then... **acceptance.**

I had two options.

1. Return to Nuxt 2 and give up on upgrading... at least for now.
2. Scrap everything and re-code the entire website from scratch using Nuxt 3.

And so, I created a new branch - called _recreation/nuxt3_ - and started.

<!-- Add page navigation -->
<Navigate
    next={{
        link: "/babel/the-rebirth/wwyd",
        name: "What would you do...",
    }}
/>