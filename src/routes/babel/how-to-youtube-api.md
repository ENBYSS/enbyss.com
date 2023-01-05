---
title: Using The Youtube API.
description: It was such a contrived experience that I made this as a note for future me.
tags: ["tech", "tutorial-like", "blogging"]
showtoc: true
category: articles # name of directory
imageAbsoluteLink: true
metaimage: 'https://www.enbyss.com/content-images/how-to-youtube-api.png'
type: complete # complete, ongoing, group [should come with an attribute (partAmnt)]
createdAt: 2021-09-12
updatedAt: 2021-09-14
---

**UPDATE 14/09/2021:** So hey! Funny story! Yeah all of this? Meaningless! I made a sequel article about it over on [at this link](https://www.enbyss.com/content/library/articles/actually-fuck-the-api). So feel free to see that since this blows.

Hello, it's been an extremely long while since I've typed up a story here. This one is going to be a bit of a mess. See, when I switched to **streaming on Youtube**, something I probably should have written about on here to be honest, I needed to update this site. _Specifically_, I needed to find a way to switch all places where I was using Twitch, and use Youtube instead. There might be some unresolved spots but that's hardly a problem.

In any case, this meant two things. **One**, I needed to display youtube subs instead of twitch followers. **Two**, I needed to find a way to see whether I'm live or not.

## The Introduction.

I'm not a good lecturer, and it's been a long while since I did this, but you _need_ an **API Key**. Basically you send it with almost every single API you touch, so that Google knows what APIs you're pinging. Useful for quotas and the like. There's **loads** of resources online on how to do this, and they all probably revolve around the _Google Cloud Platform_. Once you get your **API Key** though, you're set. 

Kind of.

## The Subscribers.

This one is very easy. There's a single endpoint you can ping to get these.

**URL:** `https://www.googleapis.com/youtube/v3/channels`

Of course though, you need to specify some query parameters.

- `part=statistics`: You need this one, it specifies what details you actually want. Here, for example, I want the statistics - which include the subscribers.
- `id={CHANNEL_ID}`: Well, you need to specifically get _your own_ channel here. So slap your channel ID here.
- `key={APIKEY}`: Of course you need your _API Key_ as we mentioned before.

Do this and voila, you basically have all you need. You'll end up finding your subscriber count over at `items[0].statistics.subscriberCount` in the response body.

## The Live Status.

This one, is not.

### Step 1: The API needs an OAuth.

So, here's when we're thrown a bit of a brick wall. See, the most direct and best way of knowing whether you're live is with this endpoint: `https://www.googleapis.com/youtube/v3/liveBroadcasts`. Here's the pickle. That right there needs an `OAuth` token to actually call it. Specifically, you need **your own OAuth token.** Shouldn't be a problem right? Except that one of the only ways of getting an OAuth token is to build a _"login with Google"_ flow. 

Here's my problem. I want everyone to see whether I'm live on the site. I can't very well tell everyone to log into my account just to see that, can I? So is there another way?

Oh yes. There is.

### Step 2: It's time to Login.

Well, firstly you need to create an _OAuth Client_. This is basically done through _Google Cloud Platform_, just click the **CREATE CREDENTIALS** button and the wizard should help you through that process. Once you do that, you'll find yourself with a `CLIENT ID` and a `CLIENT SECRET`. Take a note of these, you're going to need them.

Once you do that, it's time to make a `Login with Google` button. Don't worry, you don't need anything fancy. All you need is a hyperlink. Specifically, one like this:

```
https://accounts.google.com/o/oauth2/auth?
  client_id={{CLIENT_ID}}
  redirect_uri=http%3A%2F%2Flocalhost%2Foauth2callback&
  scope=https://www.googleapis.com/auth/youtube&
  response_type=code&
  access_type=offline
```

So, _what the fuck_ right? It's pretty big, and there's some clunkiness to it. Well, let's start.

- The **client_id** is your client ID. Simple enough.
- The **redirect_uri** is where you'll be sent after you logged in with google. This one is a bit spicy. `http%3A%2F%2Flocalhost%2Foauth2callback` looks like gibberish, but it's basically a **URL encoded** version of `http://localhost/oauth2callback`. Feel free to use this URL, as the redirect doesn't really matter at all. One important thing however. Remember that `OAuth Client` you made? You should go back, edit it, and add the URI you're using to the _Authorised redirect URIs_ list, otherwise you'll get an error. No need to URL encode this one.
- The **scope** is basically what permissions you want to give. Feel free to be safe, but in this case I just used the main scope that manages my entire account. It's only going to be used by me so, whatever.
- The **response type** is basically what you want returned. `code` says that you'll basically get an _authorization code_ back. With the _localhost_ redirect, you'll get this code **at the end of the URL**. This is the _main reason_ we're doing this - you need this code to generate a token.
- The **access type** is offline. This is important because it opens up a _special opportunity_ later on, called a **refresh token**.

Once you create this URL and its button, click the button and proceed to log into the account you want. After you're done, you might be redirected to a nonexistent page but that's okay, because if you look at the address bar, you'll see a query parameter like this `code={CODE}`.

That's the jackpot. That code is **a single-use** way of getting an access token. This means that if you make a mistake while getting the token, you're probably going to need to login with google again. At least since you have it setup by this point it's just a bunch of clicks away.

In any case, you've logged in with google and now have a code. What else?

### Step 3: Tokens everywhere!

Do you have axios? No? No need. I'll be showing some `axios` code however, specifically the code I used.

```js
let tokens = await this.$axios.post("https://accounts.google.com/o/oauth2/token", {
  code: {AUTHORIZATION_CODE},
  client_id: {CLIENT_ID},
  client_secret: {CLIENT_SECRET},
  redirect_uri: "http://localhost:3000/oauth2callback",
  grant_type: "authorization_code"
})
.then((response) => {
  console.log(response)
});
```

As you can see, this is a `POST` on `https://accounts.google.com/o/oauth2/token`. Since it's a post, this time you send a _request body_ instead of query parameters. Of course, you need to pass in the **authorization code** you just got, but you also need your `CLIENT ID` and your `CLIENT SECRET` this time. As for the redirect uri, I think it has to be the _exact same_ as the one you used in the previous step. You won't be redirected as far as I'm aware though. The `grant_type` is `authorization_code` because of course, that's what you're using.

Remember that you have _one shot_ to do this with the code you have, so make sure everything is set right. If it is, then the response should look like this:

```json
{
  "access_token" : "ACCESS_TOKEN",
  "token_type" : "Bearer",
  "expires_in" : 3600,
  "refresh_token" : "REFRESH_TOKEN"
}
```

The access token. Perfect. Except this one is useless. See the `expires_in`? Yeah, this token will expire in an hour. But don't worry, because there's the _refresh token_. This is the next jackpot. Don't worry now, we're getting close to the end.

### Step 4: F5 Token.

You remember the endpoint we used? `https://accounts.google.com/o/oauth2/token`? Remember how we specified the `grant_type`?

```js
let tokens = await axios.post("https://accounts.google.com/o/oauth2/token", {
  refresh_token: YOUTUBE_REFRESH_TOKEN,
  client_id: YOUTUBE_CLIENT_ID,
  client_secret: YOUTUBE_CLIENT_SECRET,
  grant_type: "refresh_token",
});
```

This. This is the code that you'll be using from now on. Everything we did beforehand was just the preparation. The multiple locked doors we burst through to find the **real code.** Let me explain.

Like before, you need the client ID, and client secret. However, you now use the **refresh token** instead of the **authorization code**. As far as I know, refresh tokens _don't expire_, which means this is reusable forever. Since we're using this different approach, we need to change the `grant_type` to `refresh_token`.

So now, the final question. How do we use the token?

### Step 5: Profit.
See, tokens aren't sent in the request body, nor as a query parameter. Instead, they're sent in the **header**. As an example, I attached my code.

```js
const ytConfig = {
  headers: {
    'Authorization': 'Bearer ' + tokens.data.access_token
  }
}

const URL = `https://www.googleapis.com/youtube/v3/liveBroadcasts?part=id%2Csnippet%2Cstatus&broadcastStatus=active&key={APIKEY}`;
const liveStreams = await axios.get(URL, ytConfig);
```

Of course if you're not using `axios` you need to find the instructions for whatever you're using. But in this case, we need to set the `Authorization` header to `Bearer {TOKEN}`. This is basically how you pass your access token to get the information you want.

### A Huge Disclaimer.

So far you've seen me mention _API Keys_, _Client ID + Secrets_ and _Refresh Tokens_. You need these to do your requests, from calling an API, to generating an access token. However, these are very powerful - and _linked to your account_. As a result, you **really need to be careful** how you store these things. For example, I'm using **Vercel**, and I'm storing these values as _environment variables_. In addition, any call I'm making that **uses** these values comes from a _background function_. This is because if they're done on the client side, then the client can easily find out what they are by checking the _Network_ tab in their browser's _Inspect_ window.

In other words, **remember the following:**

1. **Store these values in a private place,** like as environment variables. You don't want anyone to see them.
2. **Any request you make using these values should be done server-side / in background functions,** because if they're done on the client side, they can be easily found.

You need to exercise caution working with APIs for these very reasons. Keep security in mind.

## Resources used

I used a lot of resources while finding all of this out, and I felt like I should list them here.

- [Google Docs for the OAuth flow](https://developers.google.com/youtube/v3/live/guides/auth/installed-apps)
- [Refreshing a token](https://developers.google.com/youtube/v3/live/guides/auth/installed-apps#OAuth2_Refreshing_a_Token)
- [Live Broadcast API Docs](https://developers.google.com/youtube/v3/live/docs/liveBroadcasts/list)
