---
title: The World of APIs.
description: I've mucked about with a lot of APIs, and in so doing gained knowledge on some interesting things. Let me share them with you.
category: article
image:
    src: "world-of-apis.png"
    alt: "world of apis"
createdAt: 2023-01-11
updatedAt: 2023-01-11
---

Back when the site first started - and I knew almost nothing - making an API wasn't even considered. I knew what an API was, sure, but there wasn't really a reason for me to go on and make one for my site. At least until I wanted to use external APIs, and needed to use *tokens* to actually work with them.

Fun fact, you never want to leak **tokens** or **API keys** - unless you don't mind others stealing your credentials - so to hide them you need some kind of backend. *Serverless* is kind of a lie - it just means that **you** don't have a server, but the provider is still using servers to make your things work. Sure, it's convenient - but having a server provides innumerable benefits, one of them being having a backend.

As a result, *most* serverless providers offer a **functions** service that lets you run code on the server - which would be where you'd use the external APIs and your tokens, since clients won't be able to use it.

Say for example, that I need the key `ABCDE` to make requests. If I do it client side, anyone who uses the site can open up the network tab and see this:

```
https://api.example.com/data?key=ABCDE
```

However, if this request is done on the backend, instead the client sees this:

```
https://my-site.com/api/data
```

The key is then used in the backend - which is completely inaccessible to the client. This is likely a huge reason why you'd want **functions** for *"serverless"* websites.

# Attempt 1 - Naive

In my case, I needed to use the API to get my patreon and twitch stats. The credentials were stored in a `.env` file, *and* on the serverless provider - so that when the website run it could access them in the backend and retrieve the data.

It *worked* and served its purpose, but the implementation was *naive*. See, whenever a user accessed the site it'll do those requests - *every time.* Meaning if 100 users accessed the site simultaneously, that's 100 requests to patreon and twitch for the same data.

This is really inefficient, and also meant that any API with a quota/rate-limit could/would be hit pretty easily. You can look at my [youtube](/babel/scrape-youtube-api) article, and how mad I got there - but to summarize, it has a **10,000** quota limit, and retrieving data used up **1** unit - allowing for **10,000** requests.

Since this pool was split amongst *all* users and *all* refreshes, you can see why I hit the limit so quickly. My site isn't big at all too, I'm pretty sure there's not many people accessing it - which shows the naivete.

## Attempt 1b - Naive, with a side of Cache

So, what's an easy improvement? Why, caching the data per user! 

When a request is done, a cookie can be set for the user so that if they access the site again it could retrieve the data from the browser itself. This does lead to stale data, however at least the quota won't be reached as easily!

Although uh, it's not really much of an improvement. Users *can* refresh all the time, but most people won't - and cookies can be deleted whenever regardless, so it's not really that useful.

Infact, it didn't really help with reaching the limit - it was still hit just as fast. So, there's clearly flaws with the current approach - but there's something there. **Caching** is good, but the location of where it happens isn't. 

# Attempt 2 - Cache Money Server-side

If the cache happens *server-side*, then the quota usage would no longer scale by the amount of people using the site. Taking the responsibility out of the user effectively solves the problem - because if I, *for example*, cache every 5 minutes - then suddenly a lot less quota is used.

$$
\frac{1440 \textrm{ mins}}{5 \textrm{ mins}} = 288 \textrm{ units}
$$

From blowing past the quota, to barely using **3%** of it! Talk about a huge improvement. Of course though, caching server side is more complicated than the other two approaches - and the way I handled it is split into two stages.

## Attempt 2a - Nuxt 3

Nuxt 3, the framework I *used to use* - more on that in a later post - comes with a helper function for caching. Normally, you can define an api by using `defineEventHandler`:

```ts title="/server/api/data.get.ts"
const endpoint = "..." // endpoint with quota

export default defineEventHandler(async event => {
    const data = await $fetch<SomeType>(endpoint);
    return {
        data,
    }
})
```

However, you can change this code *slightly*, and suddenly it implements caching!

```ts title="/server/api/data.get.ts"
const endpoint = "..." // endpoint with quota

export default defineCachedEventHandler(async event => {
    const data = await $fetch<SomeType>(endpoint);
    return {
        data,
    }
}, {
    maxAge: 300,
});
```

This time, when the endpoint is hit it triggers the request - but any subsequent hit in the next 5 minutes, even for different users, will just return the cached version. Nuxt 3 effectively makes caching *incredibly* easy like this - but that is *framework* specific, and due to **as-yet-to-come reasoning**, at some point I decided to split this away into a *separate backend*.

## Attempt 2b - Express

I'll skip past all of the setup, because there's quite a bit of struggling with making typescript work and structuring code. Frameworks do a lot of the work for you, so going back to a base Node app feels incredibly different.

<Note>

As implied by the next paragraph, this is a library used to make **servers**. Serverless providers might let you work with this, but I can only vouch for having your own server to run these things on. At some point I'll talk about that - but for now, if you're using *Serverless* and this doesn't work... sorry.

But hey! Now's your chance to look into using actual servers!

</Note>

*Express* is a library used to make servers. With it you can create an app that runs as a server on a specific port. It's *very* useful to make a backend as a result. Firstly, the starting point is almost always the same:

```ts title="express.ts"
const app = express();
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ...

app.listen(3000, () => {
    console.log("Listening on PORT=3000...");
})
```

The actual basics are the first line and the last bit. The reason for the other 4 lines are to *enhance* the functionality - for example, `.json()` allows us to process json, `.text()` for text, and `.urlencoded({ extended: true })` for formats like **XML**.

`.listen` opens a port for the server so that it can start *listening* for requests. In order to define them, you then use the `app` bit directly:

```ts title="express.ts"
app.get("/api/data", async (req, res) => {
    return res.json({
        data: 1,
    });
});
```

Like this, you're setting up an endpoint `/api/data` that will run whatever's specified in the function. For example, if you run this locally, you'd need to hit `localhost:3000/api/data`. In addition, the `.get` specifies which **method** the endpoint supports - in this case being `GET`.

So, in other words - if in **Nuxt 3** we have this:

```ts title="/server/api/data.get.ts"
const endpoint = "..." // endpoint with quota

export default defineEventHandler(async event => {
    const data = await $fetch<SomeType>(endpoint);
    return {
        data,
    }
});
```

The *express* equivalent here would be this:

```ts title="express.ts"
const endpoint = "..."

app.get("/api/data", async (req, res) => {
    const data = await axios.get<SomeType>(endpoint);
    return {
        data: data.data
    }
})
```

<Note>

In the **express** example, I'm using `axios`. **Nuxt 3** has `$fetch` to make requests, and while we can use Node's `fetch` - `axios` just has better ergonomics in my opinion. Highly suggested.

</Note>

How would caching work though? Well, there's two ways to go about doing this - retrieving the data in the background, or lazy loading it. Each have their benefits, and I've decided on the former, but I'll show off both just incase.

```ts title="express.ts (background)"
const endpoint = "...";
const get_data = async () => await axios.get<SomeType>(endpoint);

let data = await get_data();
setInterval(async () => data = await get_data(), 300_000);

app.get("/api/data", async (req, res) => {
    return res.json({
        data: data.data,
    })
})
```

Here, no matter how many people use this api, the load will *always* be the same. The backend will call the request every **5 minutes** `(300,000ms)` and update the data. Here you have a consistent load, and the implementation isn't really complicated, but it's also kind of inefficient since it does the request even if no one's listening. However, it's **predictable** - and it's still significantly more efficient than no caching at all.

```ts title="express.ts (lazy)"
const endpoint = "...";
const get_data = async () => await axios.get<SomeType>(endpoint);

let data = undefined as undefined | SomeType;

app.get("/api/data", async (req, res) => {
    if (data) return res.json({ data });

    const response = await get_data();
    data = response.data;

    setTimeout(() => data = undefined, 300_000);

    return res.json({ data });
});
```

The lazy approach is also simple, and compared to the background method - more efficient. If no one's listening then no requests will be made. The logic here is a bit more complicated, but that might just be my *code writing*. The **con** here however is that someone will have to be the unlucky person to hit this endpoint when the data *isn't* cached, and wait a bit of time.

In addition, there's the problem of **race** conditions. If someone hits the endpoint, and someone else hits it before the first request completes, then `data` could end up becoming initialized twice. Of course, you can add a basic guard against this:

```ts title="express.ts (lazy, safer)"
const endpoint = "...";
const get_data = async () => await axios.get<SomeType>(endpoint);

let in_progress = false;
let data = undefined as undefined | SomeType;

app.get("/api/data", async (req, res) => {
    if (data) return res.json({ data });
    while (in_progress) {}
    in_progress = true;

    const response = await get_data();
    data = response.data;

    setTimeout(() => data = undefined, 300_000);

    return res.json({ data });
});
```

But this is rudimentary, and frankly I'm not sure I even trust my code to work with this. There's likely better approaches, but the fact remains that *lazy* can introduce some complexity into the mix. Depending on how much you value **efficiency**, this may be worth it - but realistically speaking at some point it'll scale to the same point as the **background** approach - which is simpler, avoids race issues, and doesn't have the con of some people needing to *wait*.

Plus, there's also one more benefit to the background approach that we'll get into - although it's quite less intuitive.

# Approach 3 - Server Sent Events

Now, this all serves our purposes well - but *polling* is the old-school way of doing things. Some data might not change often, which means that most requests will end up retrieving the same old data. However, there's a much better alternative.

Enter **Server Sent Events** - where a client establishes a perpetual HTTP connection with the server, and the server dispatches events in real time. This only works one-way, meaning only the **Server** can send events, as the name implies - however with this we can just wait for the server to *tell us* when new data has arrived, instead of polling.

Of course, to keep a perpetual connection open you need to configure it. You also need to get the data from somewhere. Let's look back at the *background* caching system we had before, and extend it a bit.

```ts title="express.ts (background + sse)"
const endpoint = "...";
const get_data = async () => await axios.get<SomeType>(endpoint);

let data = await get_data();
setInterval(async () => data = await get_data(), 300_000);

app.get("/api/data", async (req, res) => {
    return res.json({
        data: data.data,
    })
});

interface Connection {
    id: string
    res: Response
}

let connections: Connection[] = [];

app.get("/api/data/sse", async (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Connection": "keep-alive",
        "Cache-Control": "no-cache",
    });

    connections.push({
        id: crypto.randomUUID(),
        res,
    });
})
```

First things first, there's a new endpoint - `/api/data/sse`. That's what the client will connect to. Then we update the *response headers* in order to tell the client that this is, infact, an *event-stream* - and to keep the connection alive. Lastly, we **store** this connection.

The reason for *storing the connection* is in order to send data to it - and to do that, we'll need to keep track of it, otherwise it'll just idle. To differentiate between them we also add a random ID - which will come into play soon.

<Note>

I'll elaborate further in a different post - but the *reason* I moved away from **Nuxt 3** originated from this. Because of how it worked, it was nigh impossible to set up SSE. This was only the starting point, and the reasons compounded - but that's a story for *another* time.

</Note>

Now, we still need to keep the `/api/data` endpoint open - since it allows the client to access data even if they're unable to connect to the *stream*, in addition to not needing to wait for the stream to publish some data *(although you can send the data over during the connection)*. We also need to modify the background request a bit.

```ts title="express.ts (background + sse)"
let data = await get_data();
setInterval(async () => {
    data = await get_data();
    connections.forEach(con => {
        con.res.write(`id: ${con.id}\ndata: ${JSON.stringify(data)}\n\n`);
    });
}, 300_000);
```

Now, not only does it update the cache, but it also sends the data to *all* connected clients. In other words, if a client connects - when this request triggers, they'll receive an event that has all of the data. You can also see the **ID**, which needs to be passed. Another thing is the elephant of the room - being the *weird formatting*.

See, **SSEs** work by text - so rather than passing the JSON data directly, you need to pass text of a specific format - hence why it's called `text/event-stream`. There's documentation on this standard, but here we're specifying the **ID** and the **data** - which needs to be turned into a *string* first. This is a bit cumbersome, but it *works*. What won't work however, is this code for long.

## Subscription's Golden Rule

If there's anything to learn here, it's this. Whenever you **subscribe** for information, you always need to **unsubscribe**. To explain, let's show the flaw in the above code.

Say a user connects to the event stream, and they're registered.

```js
[
    {
        id: "user1",
        connection: {
            /* ... */
        }
    }
]
```

If their computer runs on Windows, it may decide that *now* is the time for an update, and restarts. The user is frustrated, but when it boots back up, they reconnect to the stream.

```js
[
    {
        id: "user1",
        connection: {
            /* dropped */
        }
    },
    {
        id: "user2",
        connection: {
            /* ... */
        }
    }
]
```

Uh oh. The old connection is still there, even though it's been dropped. With this, the logic doesn't scale per connected user, but for every connection that *has ever happened*. We've implemented **subscription** without implementing **unsubscription**.

This is why I call it a golden rule - anytime that there's something *listening* for information, it needs to have a way to *disconnect*, and it needs to *disconnect* properly. This also applies to logic that runs **asynchronously**, like the **Interval** request. Here we don't need to worry - but in a website for example, you need to remember to *close* that interval - otherwise a user can accidentally retrigger it over and over until their browser crashes.

Luckily, updating our endpoint with this logic is easy:

```ts title="express.ts"
app.get("/api/data/sse", async (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Connection": "keep-alive",
        "Cache-Control": "no-cache",
    });

    const connection = {
        id: crypto.randomUUID(),
        res,
    }

    connections.push(connection);

    const remove_connection = () =>
        connections = connections.filter(client => client.id !== connection.id);

    req.on("close", remove_connection);
    req.on("end",   remove_connection);
});
```

Just add *event handlers* that listen for the **close** and **end** events - and remove the connection when they happen! The reason why we listen for both is to be *very sure*, since whichever one is sent may depend on whether the user closed the connection, or it was shut down abnormally.

## Client-side

Now, the client can't just use a normal fetch here - there's an *API* for event sources!

```ts title="client.ts"
const backend = "...";
const sse  = new EventSource(backend);

sse.onmessage = event => {
    const data = JSON.parse(event.data);
    // ...
}
```

It's pretty easy, they just need to connect using the [`EventSource API`](https://developer.mozilla.org/en-US/docs/Web/API/EventSource), and then attach a handler to the event. However, don't forget the golden rule.

How you handle *unsubscribing* is up to you, but when the client moves away from the page that *uses* the event source, it should be closed.

```ts
sse.close();
```

If it's used throughout the entire site, then no need to worry about this. Unlike in the server, if a client refreshes the stream will disconnect and connect with a new id automatically.

This is a major upgrade to using **polling**, especially for efficiency. Even though in this case we're not really gaining any benefits, there's many scenarios where this is incredibly useful. For example, you can add *checks* so that the event is only sent **when** the data is actually updated. Or if you have a backend database that supports real time updates *(likely using a SSE of its own)*, and you want to filter out the data you don't want exposed to users, you can *subscribe* to that event stream, modify the data, and pipe it back out to the users.

Infact, I used something like this when working with my backend, which uses **PocketBase**.

<Note>

If you want to mess around with databases and authentication, and have your own server, I can't recommend [**PocketBase**](https://pocketbase.io/) enough. It's incredibly easy to deploy, and once its launched you can use its API and SDK to set data and mess around.

</Note>

However, when as I fell into the rabbithole there was something else that caught my eye. The *next level up* from **Server Sent Events**, and the one that gets all of the love and attention for good reason.

# Attempt 4 - Websockets

Whenever you look up anything regarding *Server Sent Events*, you'll likely hit something about *Websockets*. They're the shiny new thing that is effectively an upgrade over them. Now, I say *upgrade* - but they serve different purposes. **Server Sent Events** are brilliant for one-sided communication, they're simple and easy to implement and understand, and come with bonuses like automatic reconnection.

**Websockets** however, are more complicated. They don't run over **HTTP** and need to upgrade into the **WS** protocol - which loses out on some benefits that HTTP would provide. They also don't reconnect automatically, so you *would* need to handle that yourself if the stream goes bust for any reason. I'm starting with the negatives *because* the positives are **huge.**

Firstly, you get the two-sided communication. Maybe you don't need this yet - but basing your site on websockets means that if it's needed in the future you can easily add it - instead of needing to refactor into using **WS** from **SSE** in the future. Secondly, you can use a library like **Socket.IO** on both the server and client - and if you do then there's a *lot* of improved ergonomics. The problems of needing to reconnect? Gone. The complication? Becomes easier than **SSE**. You also don't get the event in the same weird text formatting SSE dispatches - it's sent normally like any request would.

But enough praise - let's look at how this changes the implementation. First, a look back at what we have.

```ts title="express.ts"
interface Connection {
    id: string
    res: Response
}

let connections: Connection[] = [];

let data = await get_data();
setInterval(async () => {
    data = await get_data();
    connections.forEach(con => {
        con.res.write(`id: ${con.id}\ndata: ${JSON.stringify(data)}\n\n`);
    });
}, 300_000);

app.get("/api/data/sse", async (req, res) => {
    res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Connection": "keep-alive",
        "Cache-Control": "no-cache",
    });

    const connection = {
        id: crypto.randomUUID(),
        res,
    }

    connections.push(connection);

    const remove_connection = () =>
        connections = connections.filter(client => client.id !== connection.id);

    req.on("close", remove_connection);
    req.on("end",   remove_connection);
});
```

Now, one thing I'll say. This might be wrong, but after mucking around, I believe that websockets need their *own* server. This isn't complicated, and is *likely* wrong - but I couldn't figure out a way to run both a normal HTTP api **and** a **WS** server on the same port. So, let's create a new file and server.

```ts title="websocket.ts"
import { createServer } from "http";
import { Server } from "socket.io";

interface ServerToClientEvents { /* ... */ }
interface ClientToServerEvents { /* ... */ }
interface InterServerEvents { /* ... */ }
interface SocketData { /* ... */ }

const app = express();
const http_server = createServer(app);
export const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(http_server);

http_server.listen(3001, async () => {
    // setup
});
```

One thing you'll see is a lot more *Typescript*. **Socket.IO** offers support for type-safety which is *incredibly* nice. Secondly, it's not that complicated - however we use the `http` library here instead of `app.listen` directly.

Like before, we need to actually implement some data - but this time there's no need to have a separate endpoint - it's setup automatically at the root endpoint. The code for requests is almost the same too:

```ts title="websocket.ts"
let data = await get_data();
setInterval(async () => {
    data = await get_data();
    io.emit("data:refresh", data);
}, 300_000);
```

Yeah. Dispatching an event is that simple. If you use typescript, you can also write something in `ServerToClientEvents` in order to get typing:

```ts title="websocket.ts"
interface ServerToClientEvents {
    "data:refresh": (data: SomeType) => void;
}
```

Like this, if you try to send an event that's not specified, it'd result in a typescript error.

One other thing is that you don't *need* to handle the subscription/unsubscription - it gets handled automatically by **Socket.IO**. I will stress this point - these benefits come because we're using a *library*. If we were to use the API ourselves, it'd likely result in a bunch more complexity. Luckily, the popularity of websockets means that there's a *lot* of support for making work with them ergonomic.

Then, in order to use it on the client side, it's about as easy as you'd expect.

```ts title="client.ts"
interface ServerToClientEvents { /* ... */}
interface ClientToServerEvents {/* ... */}
type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

const domain = "...";
const socket = io(domain);

let site_data;

socket.on("data:refresh", data => site_data = data);
```

Now, if you want to expose an API to *other* people, then SSE is a better option since it's much easier to work with and comes with a lot of inherent benefits. But if you want an API between your backend and frontend, *websockets* are your friend since you can use something like **Socket.IO** to make it seamless.

In my case, I wanted the latter - and the results are that a lot of the updates on my site are *realtime*. I can change the schedule, and the change gets immediately reflected for everyone who's currently on it. Pretty magical.

# Conclusion

We've basically covered a lot of API options - basic, client-cache, server-cache, SSEs, and websockets. I've only heard of the last two recently, which is why I wanted to make this article for people who didn't even know they weere an option. 

Lately though it seems like a newcomer is planning on entering the field - *WebTransport*. I don't know much on it, and it seems like no one's really maining it - likely because it's not exactly complete yet - but from what I hear it's meant to be a direct upgrade to websockets, using **HTTP3** - which means it won't need its own protocol. Sounds exciting, but the field of web development is always moving way too fast. Hopefully it'll be the best of both worlds, who knows?