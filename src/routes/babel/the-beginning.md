---
title: The Beginning.
description: A rambling about how I created this whole thing.
category: article # name of directory
image:
  src: "generic.png"
  alt: "the beginning"
createdAt: 2020-11-12
updatedAt: 2020-11-12
---

Do you like how this site looks? I do too. I spent a lot of time working on it though, and it
was _admittedly_ a bit of a pain to setup. There's a lot of things going into this, and even 
now as I'm typing this, I've only got the scraps of a website together. **Just enough** to feel
good about typing this up just to look at what I've made.

I could go on and on about this, about why I decided to make a blog and so much more, but for now
that's all just _bloat_. The more interesting part is _how_ I actually made all of this.
So lets start there.

<p style="font-weight: bold; font-size: 30px;">A disclaimer.</p>

This blog post **will** go into technical stuff. **However**, I will be as casual as possible,
and try to explain things enough, so that anyone could have fun reading this. Of course, this
could end up being a _pretty hilarious_ disclaimer in the case that I _(inevitably)_ fail 
completely at doing so. Which I probably will. But hey, **I tried.**

## The Instruments
First, you always start at the tools that you are using. There's a lot of research and looking up
that happens before you settle and go head first for a whole project. _But_ that's also boring,
so looking at other people's projects and trying to emulate them _as best as possible_, doing 
modifications all around is also fair.

The things I used are the following:

- **Nuxt.js**
  
  This is the main thing, the core of the entire site. To put it **"simply"**, it is an extension 
  of this other framework known as `vue.js`, which is similar to others like `React` or `Angular`.
  I'm not here to trash frameworks, but I work in _Angular_ so there's no way I'd want to use it 
  for personal projects, and _React_ just looked less fun to me.

  In any case, `Vue` is a massive framework that basically reworks the whole way that frontend
  development is being done. `Nuxt.js` is a framework that uses `Vue` and bundles up a bunch of 
  functionality in order to try and streamline your experience.

  In other terms, it's a bundle of shit strapped together so that my lazy ass doesn't have to 
  configure and learn about a million things.

- **TailwindCSS**
  
  In a time, long ago, there was only `CSS`. But that was kind of a pain, so a bunch of people
  decided to make libraries to try and make it an easier thing to use. Well, _easier_. One 
  of these frameworks is... _`bootstrap`_! 

  This was my first CSS library _thing_ that I used, and it was fun being able to just slap some
  classes on a thing and have it be styled in a consistent way. However, there was a problem.
  It was consistent _according to Bootstrap_, meaning if I wanted to customize stuff up a bit,
  I'd basically be losing out on the whole benefit of using the thing.

  With `TailwindCSS`, that problem _still exists_, but at the very least they include a **metric ton**
  of classes, and have about as many opinions as a blank notepad. These classes don't come with entire
  groups of stylings, they represent specific _settings_ of certain `CSS` attributes.

  To put it another way, `Bootstrap` classes apply like, 10 attributes to your thing at once. `TailwindCSS`
  classes apply, in almost all cases, a single attribute. Sure, this means that sometimes you'll end up
  with 30 classes on a single attribute, but that's when its other features like `@apply` come in, where you
  can apply a bunch of `TailwindCSS` classes to a single vanilla `CSS` class.

  ```html
  <div class="flex flex-col justify-center text-center dark:text-white">
    <h1 class="title text-6xl font-bold">Content.</h1>
    ...
  </div>
  ```

  If you're not convinced, this _entire_ article format? It's basically a single `TailwindCSS` class
  formatting the **entire goddamn document**. Look at it [here](https://content.nuxtjs.org/examples/tailwindcss-typography).

- **SASS**

  The last, and definitely the least, _(and that's a pro)_, is `SASS`. 

  `CSS` has some limitations, I'll be the first to admit that. It's very good in some senses, and it can be fun to mess around
  and colour stuff in, but _dear god_ sometimes things just go all over the place and you're left screaming your head off. Now,
  _nothing_ is going to make that less of a pain. That's just how this works. But if you have _more features_, then you'd have 
  an easier time using it.

  In comes `SASS`, an extension of `CSS` that _compiles_ down to it _(meaning a program can turn `SCSS` into `CSS`)_. I could tell
  you a list of features that it has, like _variables_, but who cares about that? Instead, I'll show you an example.

  Look at the following disaster of CSS.

  ```css
  ul.item-list {
    color: white;
  }

  ul.item-list li {
    background: blue;
  }

  ul.item-list li:hover {
    background: red;
  }
  ```

  Let's ignore for a second the _horrific_ styling that this would end up representing. Instead, let's look at the amount of
  duplication going on in there. You can see how in some cases that could end up being an absolute annoying **mess**.

  This is where `SASS` swoops in to save you.

  ```scss
  ul.item-list {
    color: white;

    li {
      background: blue;

      &:hover {
        background: red;
      }
    }
  }
  ```

  This is _equivalent_ to the `CSS` that I showed you before. See the lack of repetition, the nesting that makes it easier to
  organize things? Can you imagine being able to implement `.dark-mode` by just slapping everything inside that class, and then 
  putting it squarely on `<html>`?

  _I rest my case._

## The Starting Step

Of course, the beginning steps are to get a grasp on what you're going to actually be using. For me, this meant going over video
tutorials for `Vue.js` and `Nuxt.js`, and playing around like that. Of course experience helps out a **ton** with understanding 
and being able to do more with things, so in my case I could skip some things --- but the point is to _not feel bad if you don't get it._

### The Starting Step _for_ the Starting Step.

If someone forced me to give out a sequence of steps for _anyone_ to be able to get this far, I'd first shake my head and sigh a bit, 
but then I'd give them this list:

1. **Start off by programming in a comfortable language, like _Python_, if only to get used to the field.**

  _Python_ is well known as a language that's easy to start with, and easy to get. It's also useful if you're an expert, but if 
  you're looking to start off in programming and try to _learn_ stuff, it's a brilliant language for that. I'd suggest looking up tutorials
  for starting with it, there's a hell of a lot out there.

  The first step here is to get used to the _syntax_ of the language. This means the keywords, the commands, the symbols. Anything from
  how to declare a variable (`num = 5`), to creating a loop, `(for fruit in fruit_bowl)`, etc. This is effectively the bag of tools that you're
  given _by default._ You use these to make programs, who would've thought.

  The second step is to _flex_ them a little bit. By that, I mean implementing some algorithms. A good set of algorithms to use for learning are 
  ~**sorting algorithms**~, because it's easy to check that the output is correct, and there's an innumerable amount of resources for them.
  Some examples are the _Bubble_ and the _Selection_, which are inefficient algorithms, but they're simple to understand. If you get to a point where 
  you can understand and implement the **Mergesort** and **Quicksort** algorithms, you've hit the jackpot. Those are some weirdos to implement, and 
  you'd get a first-class ticket to a _Recursion_ lecture, recursion being a bit of a painful thing to wrap your head around when you're not used to it.

  The third step would be to experiment. Get ideas for projects to do, whatever they may be. A calculator, a journal, whatever comes to your mind.
  The point of this is to get you in the process of working on your own, having a set goal, and doing your own kind of research. **Google** and 
  more specifically **Stack Overflow** will be your biggest friend. Everyone gets stuck, and these two tools alone will get you through 80% of your
  problems. The other 20% you're going to learn as you go on. _Debugging is a skill._

2. **Once you're done with all of that, start learning HTML, CSS, and JS.**

  Technically you could start _here_, but if you're going to ask me for a list, you're going to get a poorly-planned _dumpster fire_ of a list.
  I'm not good at being organised. **Anyways**, the reason why I told you to start with Step 1 is because it would help you a ton once you get 
  to this point, mostly by getting you in the mood of things. _In any case_, you should start learning the whole thing that the frameworks are based on.

  HTML stays as HTML, it's not going to change much, but it's mostly _very_ useful to find out the building blocks of how it works. Classes, IDs, attributes,
  and _tags_ such as `<div>` and `<p>`. To give you a very brief 101 on this, here are some examples:

  ```html
  <a href="youtube.com"> This will send you to Youtube. </a>
  <p> This is a paragraph, and will be listed on its own line. You can also add <i>italics</i> and <b>bold</b> words. </p>
  <span> Spans are like paragraphs, except they'll be on the same line. </span>
  <p> As an example, <span style="color: red;">this text will be red.</span> </p>
  <h1> This is a heading. It's very big. </h1>
  ...
  ```

  There's more and more, but this should give you a general idea of how things are. See that 4th line however? _What's that `style` thing?_ Well, that's 
  _inline CSS_. Basically, it's setting CSS attributes _directly_ onto a single element. It can get a bit wordy however, so maybe you'd want to 
  make a thing that when slapped onto a tag, will make its text <span style="color:red">red.</span>

  ```html
  <style>
    .red {
      color: red
    }
  </style>

  <html>
    <p class="red">This text is red.</p>
  </html>
  ```

  ...and voila, that is CSS and HTML. Of course there's a hell of a lot more to it, there's tons more to learn about each, but this is basically the _gist_
  of both.

  Then comes `JavaScript`, which is a full on language that's used to manipulate the HTML and CSS, and do lots more things. If you're used to `Python`, 
  then `JavaScript` will feel a bit familiar. It has a different syntax which you'll need to get used to, but yeah. There's probably _even more_ courses
  for JavaScript considering it's the one main language used for web development. _Sure_ there's extensions, but even the most popular extension, **TypeScript**,
  is basically JavaScript but with added features and _types._

3. **You can now start learning frameworks.**

  Once you've experimented with Step 2, written some nice sites and experimented around, voila. You've now reached the point where you can _actually_ start learning
  stuff like _Vue.js_. Again, **technically** you can start here, but if you're not used to the stuff in Step 2, you're going to encounter a _hell_ of a lot of hiccups.
  After all, if you're not used to the thing that the framework is _built upon_, the framework is going to look much weirder and be much harder to learn anyways.

  I don't have much to say here really, I'm still learning things myself. The best I can really tell you is to look up tutorials for `Vue.js`, `Nuxt.js`, `SASS`, and `TailwindCSS`. They're not too long, and you should be able to follow them along quite nicely. One thing to keep in mind is, _it's okay if you don't get it._ There's a lot of resources out there, and all of this can be **very** confusing. Don't be harsh on yourself.

4. **Why did you write this entire section?**

  I honestly don't know. I felt like talking about it, but I sure as hell am not a good enough teacher to help people learn these things in a general fashion. Hell, I'm not
  going to be able to write up a whole _"How to program"_ guide that takes around 5 minutes to read and summarizes the entire field. But I sure can try. Plus, like I said, I want **anyone** to be able to read this and have fun doing so. It won't be fun if I sound like I'm spitting gibberish out there, right? _Even though I still am._

Now that you've tolerated me for this long, it's time to talk about the _actual_ blog. Unless you skipped to this point which... _rude._

## The Starting Step, but Actually.

### Step 1: Setting shit up.

Of course the first step is going to be the setup. You'd think this step would be pretty hard, but actually not so much! I just needed to run a single command and voila, my project was basically setup. Kind of.

```bash
npx create-nuxt-app <project-name>
```

What do you mean you don't have `npx`? Ah, right. Yeah, so first you need this thing called `Node`, [found here](https://nodejs.org/en/download/). Just install it and hopefully, if _everything goes well_, you should have `npx`. You should also have `node` and `npm`. You should _also also_ have a terminal. That comes with your system, be it Windows, MacOS, or Linux. Although on Windows it's called `cmd`, or the _command line_ for <b style="letter-spacing: 5px">long.</b> If all of this is confusing, it may be a good idea to go back to [this section](#the-starting-step-for-the-starting-step). Or go through [this page](https://nuxtjs.org/docs/2.x/get-started/installation) which explains
how to set all of this up more accurately. You know, since they're the ones who made the thing.

<b style="letter-spacing: 5px">Anyways,</b> that command will ask you many questions. Those `Nuxt.js` tutorials should tell you what the options that pop up mean, because there 
really is an awful amount of them. The thing to keep in mind is the _following_:

- I'm using _Javascript_, not _Typescript_. I like Typescript but sometimes I just wanna fuck around and find out.
- I'm using _npm_, if only to make my life simpler since I already know it. Plus it comes with Node, so.
- The UI framework I'm using is, uh. _TailwindCSS_. 
- _Axios_ and _Content_ for nuxt.js modules. Why? The former helps with making HTTP requests so that I can get things easily, and the latter is what I'm using right now to make this entire blog thing work out.
- Who needs _linting_ and _testing_? More responsible people than me, probably.
- _Single Page App_, also known as _SPA_. The other option needs a server to make things work, and god knows I don't need one, nor do I want to pay extra to host one.
- _Static_, not _Server_. Same reason for the previous option.

Everything else, which is the two last options, are completely up to you. Personally none of them affected me whatsoever, so... 🤷.

Once all that is setup, there's one _last_ thing to add. **SASS.** If you want an official guide, [here you go](https://hackernoon.com/how-i-use-scss-variables-mixins-functions-globally-in-nuxt-js-projects-while-compiling-css-utilit-58bb6ff30438). Personally however, the only thing you need to do is this:

```bash
npm i -D node-sass sass-loader
```

...and voila, you can now use `sass` styling. I bid you congratulations. You know have things setup!

### Step 2: Messing around the code _(and repeating what the docs say)_.

This is the fun, and hard, part. But this is also where I start explaining some stuff, so _\*cracks knuckles\*_...

So, `nuxt.js` comes with a bunch of cool things, but first lets start with the actual way that our project looks like. I'll be hiding some things that aren't that important.

```
- assets/
- components/
- content/
- layouts/
- middleware/
- pages/
- plugins/
- static/
- store/
nuxt.config.js
```

These might look like just a set of folders right? Well, this is where you realise that _nuxt.js attaches functionality to each folder_. Each one comes accompanied with a `README.md` that you can stare at, and it will give you a good explanation of what it does. However, why don't I give you some of my _Enbyss-infused_ summaries?

- **assets/**
  
  This doesn't do much, which I'll admit, doesn't lead any credence to my previous claim that these have _~spicy functionality~_, but stay with me here.

  This is where you'll put your global files that you'd want to access from anywhere. This includes your images, any global styling you'd want to add, etc. 
  You can access this folder with the path `~/assets` in code. So if I want to access `a.jpg` in this folder, the path would be `~/assets/a.jpg`.

- **components/**
  
  This is where you place your `Vue` components. You know, that thing that `Vue` has. ...okay fine, `Vue` components are basically single-file things that come with their own
  HTML, CSS, and functionality. As an example, the header of this site is a _component._ If I want to display it, I could just do `<Header />`, though I might need to pass in 
  some properties.

  If you want to know more, there are tutorials on Youtube that can explain this way better than I can. [This](https://www.youtube.com/watch?v=Wy9q22isx3U) is a damn good one.
  Hell, it's what I used to get interested in Vue.

- **content/**
  
  This is an extra directory courtesy of that `@nuxt/content` plugin I was talking about earlier. This is where you put all the content that you want to render. _This entire post_, for example, is in there in **markdown** format. Don't know what markdown is? You use it for Discord, it's the whole `** **`, `_ _`, etc. thing you use to add bold
  text and the works. You can also add more stuff, like `JSON` files. For more information, [here you go.](https://content.nuxtjs.org/)

- **layouts/**
  
  I'll admit, I didn't use this much. Infact, I only messed with the _already-included_ `.vue` file. And even then, I didn't even mess with it much. It's basically used to show the layouts for your application. The default is going to be your main site's layout. That place where you're seeing `<Nuxt />`? That's where your pages will be rendered. Infact, if you find yourself asking how I made the header work:

  ```vue
  <div class="w-full h-full">
    <Header class="sticky top-0 z-50" />
    <Nuxt />
  </div>
  ```

  There you go. _Oh_, if you're asking what those classes are, _TailwindCSS_. I'm basically saying the site should span the full window `w-full h-full`, and the 
  header should always show up on top of _everything_ `(z-50)`, and always show up at the top of the site `(sticky top-0)`. 

  _God I love Tailwind._

- **middleware/**
  
  Uhhhhhh.

  Okay so I'll level with you for a second. _I have no idea what this directory's purpose is._ The link in this directory's README is broken _(the actual one is [this](https://nuxtjs.org/docs/2.x/directory-structure/middleware/))_, and even when I read it, I wasn't completely sure what it was supposed to mean. So uh. Yeah. I never used it though.

- **pages/**
  
  You know how a website has pages right? This is where you put 'em! So your main page would be under `pages/index.vue`, and then anything else within that directory will
  be mapped to the URL. So, for example, if I want a page that's `mysite.com/a-page`, I can either add a file `pages/a-page.vue`, or a folder `pages/a-page`, and then put an `index.vue` in that new directory.

  However, some of you developers might be wondering, _"But what if I have url parameters?"_. Well that's covered, simply start your filename with an underscore. To show an example, here's how my `pages/` directory looks _(at time of writing)_:

  ```
  pages/
    about/
      index.vue
    contact/
      index.vue
    content/
      articles/
        _slug.vue
      index.vue
    index.vue
  ```

  ...now look at the current URL _(again, at time of writing)_:

  ```
  http://<some.url>/content/articles/the-beginning
  ```

  ...now notice that the only thing in the `articles/` directory is a file called `_slug.vue`. With that URL, `the-beginning` is being stored as a parameter called `slug`.
  I'm then accessing that as follows:

  ```js
  async asyncData({ $content, params }) {
    const article = await $content('articles', params.slug).fetch()

    return { article }
  },
  ```

  See `params.slug` there? There you go, there's your parameter. _Ignore everything else_, that's all `Vue` and `@nuxt/content` stuff. The documentation for `@nuxt/content`
  should explain... _what_ all of that is pretty well.

- **plugins/**
  
  As for this directory, I've only barely used it once, and even then I was kind of using it incorrectly. From what I can tell however, this is where you can add your own _custom_ plugins to _inject_ global constants and functions, and where you can add other people's plugins into your project. It looks like it'd be pretty useful actually.
  A link that explains it further can be found [here](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

- **static/**
  
  This is where you put static stuff. Its main special feature is that it's aliased to `/`. Meaning if I have something in `static/thing/x`, the url to access it is `/thing/x`.
  
  One could make an argument that _this_ is where you put your images. Technically you're right. I just decided to put them in `assets/` because it felt more appropriate. I'm **not** entirely sure of any major differences between this and `assets/`, asides from the whole `/` thing.

- **store/**
  
  This is a _magical_ directory that abstracts a lot of painful `Vuex` stuff away from you. If you don't know what `Vuex` is, don't worry, neither did I. This one I'll explain in a bit of detail because it is kinda complicated to wrap your head around.

  **So,** I'm using this in a pretty simple way, and for a pretty small problem. I wanted a way to have everything in the project have an _easy_ way of knowing whether the application was in _dark_ or _light_ mode. At some point I used to store this information directly in the header, since that's basically the only way to switch it for now.

  This had one problem, because _I didn't have an easy way of sending that info around._ Components can only communicate with each other either by passing properties, or by using events. The former only works if you want to move information to a child component, which already rules it out for me. The _latter_ however is actually how I used to
  implement this.

  How it _used_ to work, was that whenever I clicked on the button to switch modes, the _header_ sent out an event from the **root** element that everyone has access to, and whoever needed to know about it could just check for that specific event. By the way, you access that element by doing `this.$root`. It's automatically included.

  This had _one problem_. Components had to store a **default** value for what they assumed the dark mode to be. This had a pretty funky problem, especially when it came to _this specific page._

  See, the default was set to _dark mode_, and this page set it as much. However, if on a _different_ page, you set it to **light mode**, and then go to this page again -- it will assume it's in dark mode and **oops everything looks wrong.**

  This is where this directory comes in. If you put a file in here, it will be setup as a _store_. Its structure works similarly to `pages/`:

  ```
  index.js        this.$store
  store1.js       this.$store.store1
  store2/      
    index.js      this.$store.store2
  dir/
    store3.js     this.$store.dir.store3
  ```

  I decided to setup an `index.js` in order to make it work with my dark mode:

  ```js
  export const state = () => ({
    darkmode: true
  });

  export const mutations = {
    toggleDarkmode(state) {
      state.darkmode = !state.darkmode;
    }
  }
  ```

  It looks pretty simple eh? I have a **state** that stores whether it's currently dark mode or not. By default, it sets darkmode to _true._ Then, there's _mutations_ that can
  be used to update and change the state. In this case there's a _single_ mutation, `toggleDarkmode`, which does what it says on the tin. It's pretty simple.

  You might be asking though --- _how do I access the state, and trigger a mutation?_ You'll be happy to know that it's as simple as the store itself.

  ```js
  this.$store.state.darkmode; // gets darkmode from the state
  this.$store.commit('toggleDarkmode'); // executes toggleDarkmode
  ```

  ...and voila! It all just works. Small note, if you have a mutation with _parameters_, `.commit` also takes in additional parameters to reflect that.

  A link to explain this can be found [here](https://nuxtjs.org/docs/2.x/directory-structure/store).

...and that's the lot! Basically how the directory structure is laid out. I think I kind of lost the plot here and just went all in to explain something that, truth be told, _is already explained by the Nuxt docs_. Kind of weird when you think about it, whoops.


### Step 3: The rest is honestly too technical to go into. _Also I'm tired._

Sometimes this happens, I feel a bit bored and start getting all sleepy. But the header isn't wrong. The rest of the process is all _very_ technical and in all honesty, this was all done by browsing tutorials and documents provided by the `nuxt.js` team.

Another thing is that this is getting a bit unbearably _long_. Like too long. That thing at the start is saying that this is a **21 minute read**, which holy shit. I've typed too much.

I do have _some_ other things to talk about, such as _how the dark mode styling works_, _singing the praises of SASS_, and some other funky stuff that I'm working on... but that will come at a later date.

_Maybe._

**_My memory is unreliable._**

## A Haphazard Conclusion

This also served as a test-blogpost, on one hand because I just wanted to talk about something, and on the other hand to have an actual _blogpost_ on this site, instead of some 
_test garbage_. I still need to style the content page up a bit honestly to make stuff look nice, and I need to sort out the whole category system. So far I'm calling this an _article_. Which uh. I guess it is? Sure yeah.

I'm not sure of other categories to make up. Maybe reviews? Yeah that's a good idea. I'd make `tutorials` a category but _god_ I'm not good at writing those. I have a feeling that **articles** is going to be the category I use most. After all...

_...it's the one with the least effort needed._
