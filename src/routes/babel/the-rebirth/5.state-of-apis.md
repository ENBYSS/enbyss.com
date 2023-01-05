---
title: State of APIs - V
description: States, and serverless functions. Why are they linked? Well...
category: articles
image:
    src: 'rebirth/5.stateofapis.webp'
    alt: 'State of APIs - V'
createdAt: 2022-08-29
updatedAt: 2022-08-29
---

Last time, I went on about the theme switcher, and I showed a bunch of code.

```ts
import { useWindowData } from '~~/stores/window';
import { useThemes } from '~~/stores/themes';

let windowData = useWindowData();
let themeData = useThemes();

const state = reactive({
  collapsed: true,
  width: computed(() => windowData.width),
  isMobile: computed(() => windowData.isMobile()),
  backgroundImageLink: computed(() => themeData.current.background),
});
```

...and you probably have a whole lotta questions, unless you're familiar with this kinda thing in which case, hope you're enjoying my thought process!

First, lets start with something important that we need to get out of the way before continuing - this is where some _Vue_ is gonna be taught. Don't worry, I'll try to make this easy.

## A Rapid Primer

### ref

So, let's consider this code.

```vue
<template>
    <h1> {{ count }} </h1>
    <button @click="countup"> count up! </button>
</template>

<script setup lang="ts">
let count = ref(0);

let countup = () => countup.value = countup.value + 1;
</script>
```

All it does is show a count, starting from 0 - and when the button is pressed, the count increases by one. `{{ count }}` means, _"use the value of `'count'`"_, which as we can see - is `ref(0)`. So, first question - what's a ref?

A _ref_ makes a variable _reactive_. In other words, when the `value` of a `ref` updates, `{{ count }}` will update as well. If we did this...

```ts
let count = 0;

let countup = () => count = count + 1;
```

We could press _countup_ all we want - `{{ count }}` would not update. In other words - you make something a _ref_ when it's value _changes_, and you want wherever it's being used to _update_ as well.

### computed

Now, let's say we want to show _double_ the count as well.

```vue
<template>
    <h1> {{ count }} </h1>
    <h2> {{ doubled }} </h2>
    <button @click="countup"> count up! </button>
</template>

<script setup lang="ts">
let count = ref(0);
let doubled = computed(() => count.value * 2);

let countup = () => countup.value = countup.value + 1;
</script>
```

For this, we're using `computed` - which in essence uses a _function_ to get its value. It's useful for whenever you want to use a _reactive_ value that is _computed_ using its contents. Here, `doubled` will always be the double of `count` - even when we press the `count up!` button. Got it? Good.

### reactive

So this is where wording gets weird. You've seen me say _reactive_, and now we're going to talk about `reactive`. Whenever I'm talking about the _function_, I'll show it as code (`reactive`). ...anyways.

`reactive` is very similar to `ref`, with some important differences. To hammer the point in, I'll also show code examples.

```ts
let refdata = ref(0);
let reactivedata = reactive(0); // error!

let reactivedata = reactive({ number: 0 });
```

So, difference one - `ref` can take anything, but `reactive` can _only_ work with `objects`.

```ts
let refdata = ref({ number: 0 });
let reactivedata = reactive({ number: 0 });

const updateRef = () => refdata.value.number = refdata.value.number + 1;
const updateReactive = () => reactivedata.number = reactivedata.number + 1;
```

Difference two - `ref` needs you to use `.value` to actually use or change the value _in the code_ (in the template you don't need to add `.value`), however `reactive` simply lets you access the information directly. Useful for when you don't want to slap `.value` everywhere.

```ts
let refdata = ref({ number: 0 });
let reactivedata = reactive({ number: 0 });

const resetRef = () => refdata.value = { number: 0 };
const resetReactive = () => reactivedata.number = 0;
```

Difference three - you can _reassign_ the value of a ref, however for `reactive` you can only modify _parts_ of it. So if you need to _reassign_ a value, you're gonna need to use `ref`.

Now you know the difference, which took me a while to understand myself. If you're still confused, don't worry - it can take a while to sink in.

### Primer Conclusion

That took a while, and probably was too much - but I needed to clarify this before I went into _states_, since stuff like this is used in there. Hopefully you have an _idea_ of what all this means, even if ya might not 100% get it. All you need to know, is that `ref and reactive` are used to make something _reactive_, and `computed` is used to generate a reactive value using a _function_.

## States

So, states. Firstly - why do we need 'em?

Not everyone needs them, it always depends on what you're making - however as the project grows and becomes more complicated, the idea of using _states_ becomes more and more attractive. Why's that? Because it allows you to _share data between pages._

For example, _theme._ Whichever theme is being used right now, should persist for _all pages_. However, each page has its own data in it, and the only way _components_ can communicate with each other is by passing properties. So, what, I need to add `theme` as a property for every single thing in my project? Well, no - you just use _states_.

```vue
<template>
    <h1> Current theme: {{ theme }} </h1>
</template>

<script setup>
import { ThemeState } from '/states';

theme = computed(() => ThemeState.theme);
</script>
```

That way, wherever you want to know the current theme, you can just import the state and access the value directly. However, the code above is far from the best way of doing it - if it even works. The way it usually works, is that you start from a _Store_.

### Stores

A _store_ uh... stores a _state_. It's effectively a wrapper around it, adding functionality to set up the state, modify it, act on it, etc. An example of a _store_ could be the following:

```ts
class ThemeStore {
    constructor() {
        this.theme = ref('light');
    }

    toDarkmode() {
        this.theme.value = 'dark';
    }
}

let store = null;
export const useThemes = () => {
    if (!store) {
        store = new ThemeStore();
    }
    return store;
}
```

That way, whenever you want to access the current theme, you just do `useThemes()`. If it's not setup, then the store gets initialized. Otherwise, you just retrieve the existing store. 

```ts
import { useThemes } from '/stores';

const themes = useThemes();
const currentTheme = themes.theme;
```

However, doing this manually looks a bit ugly - and as states get more and more complicated, maintaining all of this could become more of an effort. Plus, _I'm not even sure this code works_ - I haven't tested it. Functionally, it's pseudocode - because dealing with reactivity can be a bit of a disaster. So, if you think you're gonna be keeping track of a lot of states, with all kinds of logic - there's a library called `pinia`.

### pinia

Libraries are great aren't they? No need to write all kinds of boilerplate over 'n over again - someone's done the work for you! Plus, since they focused primarily on it, there's a good chance that they have optimizations and features that would be hard to figure out or implement from scratch by yourself.

Pinia is basically _the_ state management library to use, having surpassed the previous solution which was `Vuex` - a library I could barely understand, not only because I was less experienced back then, but also because it was pretty uh. Complicated.

As usual, I'll explain and show `pinia` by using - you guessed it - code examples.

#### Definition

So, you first start by _defining_ the store.

```ts
import { defineStore } from "pinia";

export const useThemes = defineStore('themes', () => { /* ... */ });
```

Each store needs to have a _unique key_ - the reasoning being similar to our initialization. The first time you use `useThemes()`, it will setup the store with the key `'themes'`. The second time, it finds an already existing `'themes'` store and returns it instead. What about the second parameter though - what's happening there? Well that's the _logic_.

#### The State

```ts
import { defineStore } from "pinia";

export const useThemes = defineStore('themes', () => { 
    let current = ref('dark');
    let themeName = computed(() => `${current.value}-theme`);

    return {
        current,
        themeName,
    };
});
```

So, here we're setting up the state. When you use `useThemes()` for the first time, `current` will be setup as `'dark'`. `computed` also works here, so `themeName` will also start as `'dark-theme'`.

Now we have global data, but what can we do with it? As is - nothing. That's when we start adding _functions_.

#### Functions

```ts
import { defineStore } from "pinia";

export const useThemes = defineStore('themes', () => { 
    let current = ref('dark');
    let themeName = computed(() => `${current.value}-theme`);

    function setTheme(theme: 'dark' | 'light') {
        current.value = theme;
    }

    return {
        current,
        themeName,
        setTheme,
    };
});
```

Now, we can use `setTheme` in order to update the state. So if we use `setTheme('light')`, the values of the store will update for _everyone who is using them._ 

#### Usage

So we've defined the store, but how do we actually use it? Well that ends up being pretty simple.

```vue
<template>
    <h1> {{ themes.current }} - {{ themes.themeName }} </h1>
    <button @click="themes.setTheme('dark')"> to dark </button>
    <button @click="themes.setTheme('light')"> to light </button>
</template>

<script lang="ts">
import { useThemes } from '~/stores';

const themes = useThemes();
</script>
```

You just import it, and then everything that's being exported in the store can be accessed directly.

::note
Something to keep in mind - if you want to _deconstruct_ the store, you'll need to use `storeToRefs`.

```vue
<script lang="ts">
import { useThemes } from '~/stores';
import { storeToRefs } from 'pinia';

const themes = useThemes();
const { current, themeName } = storeToRefs(themes);
const { setTheme } = themes;
</script>
```

What the function does is _keep_ all the reactive values... reactive. Since the function _isn't reactive_, it's just a function, we can just access it directly. If you _forget_ to use `storeToRefs`, all values you get will _stop being reactive_, kind of ruining the purpose of using a state.
::

### So... themes?

Yep, this is how themes work. I have this code in the _root/main_ file...

```vue
<script lang="ts" setup>
import { initThemes } from './stores/themes';

// Setting up theme...
const { themeStore } = initThemes();
const current = computed(() => themeStore.current.cssClass);

useHead({
  htmlAttrs: {
    "class" : current,
    "lang" : `en`,
  }
});
// ...
</script>
```

It might look a little different, but for now just assume that `initThemes()` works the same as `useTheme()`. We initialize the store, extract the `cssClass` of the current theme, and then set the class onto the `<html>` element. I could have also added a `computed` property in the store instead of creating one here, but since it's only being used once I decided against that.

However, you might notice that this document is getting pretty long and I haven't gotten into APIs yet. Plus, `initThemes()` isn't just a normal store definition. There's more happening there infact...

```ts
// Initialization
export const initThemes = () => {
    const themeCookie = useThemeCookie();
    const themeStore = useThemes();
    const { current } = storeToRefs(themeStore);

    watch(current, (newTheme, _) => {
        themeCookie.value = newTheme.cssClass;
    });

    themeStore.setTheme(themeCookie.value as ThemeKey);
    
    return {
        themeCookie,
        themeStore
    }
}
```

Oh yeah. This was just part 1. I hope you're ready for things to get more complicated.

::page-nav
---
prevLink: "/babel/articles/series/the-rebirth/sidebar"
prevLabel: "Sidebar"
nextLink: ""
nextLabel: "State of APIs, Part 2"
---
::