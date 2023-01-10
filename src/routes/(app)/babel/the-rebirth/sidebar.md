---
title: Sidebar vs. Header - IV
description: Why did I do the switch? And how did making the Sidebar go?
category: article
series:
    name: rebirth
    part: 4
image:
    src: 'the-rebirth.png'
    alt: 'Sidebar vs. Header - IV'
createdAt: 2022-08-28
updatedAt: 2022-08-28
---

One of the most transformative changes between the old site and now is the method of navigation. Before, it was a header stuck at the top of the window, with all sorts of buttons and a logo that sent you back to the home page. _As you can see,_ said bar is nowhere to be found. Instead, a button in the top-left screen that opens up a sidebar.

I'll go over the why and how - both questions have pretty interesting parts in them.

## Design and Screens
Your average screen has a 16:9 ratio, excluding phones who nowadays more often have a 9:21 ratio when in portrait - which is how people usually use websites when on mobile. Headers are always _horizontal_ - from the left to the right. Usually however, headers do not make use of all this space - at best they cover the middle ~60% of the bar since it looks _cleaner_ that way.

Sidebars however, are _vertical_. They stretch from bottom to top, popping out from the side. These constructs don't follow the same _wasted space_ design of headers - more often than not, the entire space occupied by the sidebar is up for use. Not _used_ mind you, but _available._

They do come with a trade off though - since English is read horizontally, a sidebar needs to occupy more horizontal space as a result, in order to fit in the words. This contrasts with headers who, due to _already_ being horizontal, can simply slap words on and call it a day. This means that _sidebars_ end up taking more space than headers would - at least, _normally_. We'll come back to that.

This point is called _screen real estate_, and I've mentioned ratios - why? Well in **16:9**, the horizontal bar end up being quite long - however as we mentioned, the entire bar is rarely used. Design-wise, this is quite the amount of wasted space - however _paradoxically_ on mobile the problem completely flips.

In **9:21**, the horizontal bar loses a lot of length - and in most cases this amount is pretty significant, leading to its contents no longer fitting in. This leads to the creation of _hamburger_ menus, which when pressed will cause a selection of options to appear. In other words, the header ends up as nothing more than a vehicle for further options. It is a _master folder_, whose only other position is home.

Of course, this all depends on your needs - there could very well be ways to stuff everything needed into a mobile header - but then you run into _responsiveness_ issues, since you establish a minimum supported screen width that all devices using your site must follow. _Otherwise_, either the header clips out of view, obscuring options - or the entire window extends horizontally, allowing for horizontal scrolling that shouldn't happen.

Let's go back to **16:9** for a moment, because something should be clicking about now. I talked about _16:9 not using the entire header_, and then followed it up with _9:21 not having enough space._ Considering that the header needs to _switch modes_ between 16:9 and 9:21, in order to display the hamburger menu and all that, then a _breakpoint_ needs to define that in order to say **this** is when the switch occurs. A reasonable assumption would be that this switch occurs when _the header can no longer fit all information,_ since you need to keep all navigation accessible.

This is partially the reason why _16:9 headers waste space,_ if they took up the entire bar, then you'd need to switch the _moment_ that things don't fit. The only counters to this are to have _extra_ modes inbetween desktop and mobile, or adding some way of dynamically adjusting to the screen size - which will likely be quite a lot of functionality, engineering, and maintenance. To add, you _can easily_ run out of space - so at some point you're going to be forced into a tough choice. Either you...

1. Decide to keep stuffing stuff in, having to adjust whichever system you're using in order to keep everything as displayable on screen sizes, or
2. Decide to add a cutoff, and only keep a _limited_ amount of options on the header - with any additional navigation or functionality happening in nested menus.

As you can see, there's quite the numbers of design problems that you need to address and solve in your own way. I _want to stress_ - headers are not bad by default. They are more intuitive and can feel more sleek - there's definitely applications for them and executions that work well. However, I want to point out the problems in order to further explain _why I switched._

## The V1 Header

This header was a bit of a mess. Design wise, it didn't look terrible - however I struggled quite a lot with the aforementioned problems and nothing quite felt like a good solution. I fit in a home button, links, and the theme switcher - everything that I wanted to leave _accessible in all pages._ This caused the issue of needing a way to _structure_ everything - because the more things I added to the header, the faster that _breakpoint_ would have to be hit - or alternatively, the more _extra logic_ to accomodate the new states or dynamic approach.

In the end, the best I managed to do was to rename the links into short names. In addition, one of the two links - known as _Abyss_ was basically just a page that contained access to the rest of the site. It was a glorified folder, in other words. Could have added a _dropdown_ to it, but that's more logic that needs to be added, designed, and maintained.

Of course, I still had to implement logic **for** said breakpoint. This was no small task, it took me a while to design it, and the result was pretty miserable. Not only did it look clumsy, the code was a complete mess. Since you need to write two different designs, I ended up duplicating links as well - which meant that if I _ever_ wanted to update a link in the header, I needed to _modify_ the mobile version as well - something that I forgot quite often.

There was also a problem of mine, being that sometimes I wanted the page to be full screen. As an example, I'm working on **The Grid** - a project for Extralife 2022, and I wanted a way to hide the header so that the main focus ends up being _The Grid_ itself. However, if I just hid the header, that would remove all methods of navigation. It could have been made collapsible, but that's more logic for a single case - not to mention that there would need to be a way for such logic to _not exist_ in normal pages.

As you can see, I ended up feeling sour about the header design. So when time came for this site, I knew what I wanted.

## Sidebar's Pros

The way I saw it, a sidebar was _the_ thing I wanted for my requirements.

- _Collapsible:_ Most sidebars are collapsible, which means that when the user didn't want to use it - which tends to be often as most time is spent on the same page - it could be hidden so that the main content has all the real estate desired.
- _One design:_ Since it's collapsible, this also meant that only one design is needed. A sidebar that works on desktop will work on mobile - the only additional requirement would be to make sure that the sidebar never extends beyond the full width - which is as easy as setting _max-width_ to be _100%_.
- _Lot more space:_ The sidebar could cover a lot more space than a header could, meaning that more links and features could be added that in a header would either need hiding in a menu or be omitted entirely.
  - _Bonus:_ Vertical scrolling also means that the sidebar can stretch indefinitely, compared to a header that would need to scroll horizontally - something that's unintuitive without the use of a scrollbar or special functionality.

Compared to the header design, the sidebar had a lot less struggle to manage as well. Not much thought needed to be given about what can or can't go into the sidebar - those came for free on account of the additional space. However, there was still a main design decision that needed to be made.

_How would the collapsing work?_

## Collapse

Obviously, we want a way to trigger the collapsing. The main way of doing this is a button that would trigger a flip in state - if _collapsed_, _reveal_, and vice versa.

Where would the button be however? This is where we go into another design choice - _should the collapsed sidebar still be visible?_ If so, then we can place the button on this still visible sidebar. Having this design comes with the benefit that the sidebar is _still_ useful when collapsed - with the con of still taking up real estate when not needed, not to mention that on mobile screens which are _usually_ in portrait, that would be an awful lot of used space that cramps the content. So, I went with the alternative - _completely hide the sidebar_ when collapsed.

So where to put the button? On desktop, the intuitive spot is next to wherever the sidebar is. Once pressed, it'll open up the sidebar that's next to it, or close it. That way they're visually _linked_ as well - although this comes with a problem. This button would need to touch the border of the screen, specifically the border that houses the sidebar. In my case, this is _to the left_ - and although the obvious picks might be the _corners_, this would look awkward on mobile. Top left would mean the content would need to _shift downward_ so that it's still visible. Not to mention that, _if the sidebar takes up the whole screen_, the button would end up going off screen.

The solution here is to take tips from the _header_ approach - having two states. Nowhere near as extreme as redesigning the sidebar - here only the button needs to be redesigned. Instead of having the button at the top left, it would be separate at the bottom right, where buttons tend to be in mobile apps. It can be small, to limit how much it ends up obscuring, and even then we can add spacing at the bottom - which is something that's desired anyways in order to provide some distance from the borders of the window.

With that, we have the design - but what about the execution? Here is where it actually gets easy. Since the sidebar and button both need to be in a _specific_ position at all times, no matter what the window - they can be set as _fixed_. Then, assuming for example that the sidebar is _200 pixels_ wide, collapsing would work like this.

- When revealed, the sidebar is positioned starting from the _top-left_ `(top: 0, left: 0)`
  - On desktop, the button is then placed right next to it `(top: 0, left: 200px)`
- When collapsed, the sidebar is positioned _offscreen_ `(top: 0, left: -200px)`
  - On desktop, the button is then placed _in the top-left_ `(top: 0, left: 0)`
- On mobile, the button is always found at the _bottom-right_, slightly away from the border `(bottom: 10px, right: 10px)`

This is all the logic that is needed. Depending on the state, we change the value of `left` for the specific components, and that's it. Animating this also comes for free by just adding `transition: all 200ms ease;` which would animate the change in position. Infact, let me show you all the CSS and logic I use for the _collapsing_ functionality.

```vue
<template>
    <!-- Sidebar -->
    <Sidebar class="transition duration-100 fixed top-0 w-[25rem]" :class="state.collapsed ? '-left-[25rem]' : '-left-0'" />

    <!-- Button on mobile -->
    <button v-if="state.isMobile" @click="toggleSidebar" class="fixed bottom-5 right-5 w-[5rem] h-[5rem]">
        <font-awesome-icon class="opacity-70" v-show="state.collapsed" :icon="['fas', 'circle-chevron-right']" size="3x" />
        <font-awesome-icon class="opacity-70" v-show="!state.collapsed" :icon="['fas', 'circle-chevron-left']" size="3x" />
    </button>

    <!-- Button on desktop -->
    <button v-else @click="toggleSidebar" :class="state.collapsed ? 'left-0' : 'left-[25rem]'">
        <font-awesome-icon v-show="state.collapsed" class="-ml-8 -mt-4" :icon="['fas', 'caret-right']" size="6x" />
        <font-awesome-icon v-show="!state.collapsed" class="-ml-8 -mt-4" :icon="['fas', 'caret-left']" size="6x" />
    </button>
</template>

<script setup>
function toggleSidebar() {
  state.collapsed = !state.collapsed;
}

const state = reactive({
  collapsed: true,

  // don't worry about this
  isMobile: computed(() => windowData.isMobile()),
});
</script>
```

For the sake of this example, I stripped out all the logic/CSS that was unrelated, like things that made the buttons look pretty etc.

As you can see, the only _logic_ here is just a function that flips the `collapsed` state. Then, depending on that, we specify the position of the desktop button and sidebar. Plus, we use it to display the right symbol on the button _(right to reveal, left to collapse)_ so that it feels more intuitive. Compared to the header, this is a lot more simple. However, there's _one small thing_ you probably noticed. A comment.

```ts
// dont worry about this
isMobile: computed(() => windowData.isMobile()),
```

To explain, `isMobile` just says whether we're on mobile or not. This is specifically done by comparing the screen width with a value - I picked _864 pixels_. If it's thinner than that, the screen is on mobile. Wider? Desktop.

Now you might be wondering where this logic is, or where `windowData` even came from. It's not a native property - so how's it here? The truth is that I omitted how it got here.

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

Didn't forget about the _theme switcher_ right? I wasn't going to keep you in the dark about how that's working. Just needed to ease you into the truth. 

This is how I'm getting `isMobile`, and where `windowData` came from. This same method is used for _so_ much more information that's on the site.

Welcome to _state management_. But not just that - next time, _we'll be going into using APIs_.

<Navigate
    prev={{
        link: "/babel/the-rebirth/theme",
        name: "The Theme Engine",
    }}
    next={{
        link: "/babel/the-rebirth/state-of-apis",
        name: "State of APIs",
    }}
/>