# enbyss.com

A site for all things ENBYSS - now open-source once more to share in the knowledge!

## Setup

### Docker

Using docker is very simple - although currently I've only verified the production method, since I always tend to use the manual method to work in production.

```sh
docker compose up -d
```

This is the method used in the workflow, although there we also use `--build` and `--force-recreate` to re-launch the container on deployment.

### Manual

If you'd like to set things up manually, either because you don't want to learn docker just yet, or need to run the development build, then it's pretty easy.

```sh
npm i
npm run dev
```

Just install all the dependencies, and then run the dev profile. Some things will be strange, for example the `/babel` page will take a while to load, since it
needs to import and process **all** markdown files beforehand. Unsure how this can be improved, especially because the frontmatter is *required* to display the index.

In **production**, these paths should be pre-rendered - which means the work is offset to buildtime. This means better performance, however Vite might explode due to
memory issues. This is why the `build` profile has the following option.

```sh
NODE_OPTIONS=--max-old-space-size=32768
```

Don't worry - it will not consume all your RAM, at some point it'll use swap memory instead. All this does is avoid the Vite Out Of Memory explosion. *Speaking of*, you build the production version by doing this:

```sh
npm i
npm run build
node build
```

This project uses `@sveltejs/adapter-node` since it's self-hosted on a server.

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Motivation

Multiple years ago I wanted to have my own site, but I didn't really want to use a hosting service. Instead, I wanted to use it as an experience to learn frontend development. Back then I used Nuxt 2, then upgraded to Nuxt 3, and after some troubles I decided to rebuild my site once more in *SvelteKit*.

I'll write something up about that someday - but nowadays I've learned quite a lot about web development, and much more! This project took a long while, and will probably never finish, but it's taught me frameworks, web development, how to have a backend, server management, system engineering, and more.

## Why the README?

I believe in sharing knowledge - all of what I learned has taken quite an amount of time and research, and the more this information and process gets documented, the less time others will take, and the further progress will be made.

As such, even though I **emphatically** don't think anyone should just reuse all of my source-code to host a mirror of my blog, I feel that letting people play around this project both allows for people to potentially contribute to my site, *and* lets developers learn how certain things are implemented.

For example, curious about how I have *reading time* for my blogposts? You can run the code and play around to learn more about it and **verify** that it works!

To add, some people might want to copy some elements, and instead of having people just try again from scratch *(which can be enlightening, but also **daunting**)*, they can browse this code and play around to learn using already existing code, providing a good jumping point.

So yeah! Feel free to work with this project! **Please** don't mirror my site directly, but feel free to copy some logic here and there to bootstrap your journey!

**Note:** This site uses a separate *backend* to function - which can obfuscate some logic. I doubt I'll open source the backend due to the sensitive nature of... you know, it being a backend - but maybe I will one day.

I'll write some articles in the future for the learners among you though - don't worry. Hell, you can start already by checking out [BABEL](https://enbyss.com/babel) - my blog section.