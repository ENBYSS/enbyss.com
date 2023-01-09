---
title: Mastodon - What is it?
description: As explained by someone who's terrible at explaining things.
category: article
image:
    src: 'mastodon.png'
    alt: 'What is Mastodon?'
createdAt: 2022-11-20
updatedAt: 2022-11-20
---

Ah, Mastodon. The platform most touted as the shining alternative to **Twitter**. For people who have only just started hearing about this platform, it seems like nothing more than a competitor - a carbon copy with some minor changes that, due to some catastrophic changes at Twitter, has become the first-priority replacement for so many. And yet, this is *fundamentally wrong* - and these people are coming in with a misleading idea of what they're going to encounter.

# Fediverse

So, this page mentions **mastodon** - but to explain as best I can, you need to also know about the **fediverse**. In truth, the **fediverse** is the *actual* platform - the *actual* quote-en-quote *replacement* of Twitter. What it is, is a network that *instances* can connect to - and those instances can then *inter-connect* with each other.

For example, when people say **mastodon**, they usually mean **[mastodon.social](mastodon.social)** - the dominant instance since it was launched by the guy who was the *original author* of the **mastodon** software itself. However it's not the **only** instance - infact I have an account on **hellsite.site** - which is yet another mastodon instance. It connects to the **fediverse**, which means I can still see and interact with posts within this network - with some exceptions that I'll get into later.

So, **mastodon** is less so the twitter replacement, and moreso the software that *instances* run on. There are alternatives to this that connect to the *same* network, from *forks* with minor changes to entirely different software, that I won't get into here - but just know that the actual alternative touted here is the **fediverse**.

Now, why's it called that? Well, because it is a group of **federated** servers that are hosted independently, but can communicate with each other. Think of it as a **federation** - with each instance being a member of said federation. The technology underlying this is way beyond the scope of this page to explain, but to put it simply - the way it works is via a *protocol* called [ActivityPub](https://en.wikipedia.org/wiki/ActivityPub) which software like **mastodon** implement to join the *federation*.

Why am I going into this much detail? Because it's very required to understand the great, and fundamental differences between **twitter** and **"mastodon"** - which I'll refer to from now on as the **fediverse**.

## A Clearer Analogy

Incase all of this went over your head, I'll try to reword it using a different analogy.

You know Earth, right? Of course you do, it's the lump of rock you're standing on right now. So - imagine that in a parallel universe, countries *don't* exist. There's just a single country, and it's **Earth**. There's a world government and a world leader - and everyone on the planet must abide by all of **Earth's** rules. This is a **centralized** structure - you only have one *center*, and everyone is connected together inherently by being a part of Earth. This represents **Twitter** - single leader, single *"governing body"* (aka the company), one code (twitter terms of service).

Let's go back to our Earth now - the one we all live on, because it doesn't work like that. You have over 200 countries, each with their own leaders, laws, people, and culture. They might share laws, like **murder being illegal** is something that most countries believe in *(usually)*, but each one still has differences, like more laws or less - or just different ones. However, just because they're separate doesn't mean they're not connected. Americans can interact with Spaniards, even though they're on different countries with differing culture, laws, etc. Here, we have a **decentralized** structure - There is no core center, and the most you'd get are *alliances* amongst multiple instances to work together, or form diplomatic relations.

This represents **the Fediverse** - many leaders, many governing bodies, many codes. In this case, **Earth** is the fediverse, and the countries are the *instances*. Maybe **mastodon.social** is the america analogue due to being one of the biggest influences, I dunno - this analogy will start wearing thin if I keep going on so let's stop here.

# Differences?

So, knowing all this - **now** we can go into the differences. Which are *theoretically infinite*. Yeah, so turns out when the platform is just a *protocol*, that allows for a **lot** of flexibility. An instance can have **500** characters with a **5MB** file limit, but Joe Schmoe can launch **joe.mama** which has no character limit and a file limit in the **yottabytes**. As an example, I'm on **hellsite** which has a character limit of uh, *a million* - and a file limit of... I actually don't know. 

Each instance, like I said, also has its own **rules**, and because each instance has its own *administrator*, moderation is heavily dependent on the admin present. For example, on **Twitter** moderation can be a bit of a mess - like that one time I said **"Punch TERFs"** and got my entire twitter presence ass-blasted into the void before I cheated the system and made another account. When you have millions of users, at some point your moderation team needs to get unreasonably big - and when it inevitably *doesn't* and starts being spread thinly, moderation starts to suffer.

However, if you're on some random instance, like **joe.mama** - that instance can have different rules, like *"8b. Fuck Terfs"* - so you can infact say the objectively morally sound sentiment **"Punch TERFs"**. Infact, **Joe Schmoe** can ban whoever for whatever reason they want - they're not really bound by any rules or incentive to argue with someone. If a person tries to subtly argue about transphobia vaguely enough to subvert a ban, **Joe** can just look at them and go **"nah, banned. you're a dick lol"**. This is a *massive* breath of fresh air - because the administrators and moderators can be actual human beings instead of corporations masquerading as such.

Of course, the larger the instance, the less this applies. **Mastodon.social** has like, 2 million members - so you might end up encountering the same issues. Emphasis on **might** - I don't use it, and I haven't really looked too far into how their moderation functions, the point is mostly to emphasize just how varied the moderation on different instances can be. Though, you might have quite the reasonable question here - can't an instance dedicate itself to trolling everyone and just be a hateful spiteswamp that tries to make everyone on the fediverse miserable?

# Defederating

The answer is... yeah they can! However, they likely *won't be successful.* See, once you're in the federation, you can *decide* who to *federate* with. You're not forced to experience the full space, and the administrator can, infact, **defederate** from instances. This act is somewhat like **blocking** an entire website, so if **hateful.ass** pops up and **Joe** decides not to deal with hateful assholes, they can simply **defederate** and now no-one in **joe.mama** nor **hateful.ass** can interact with one another. 

This effectively makes trolling *much* harder - because think about it. If you're on an instance that supports things like LGBTQ issues, and transphobes want to troll you - there's quite the number of countermeasures.

- Your instance can be **closed**, not allowing new accounts to register. Useful to reduce the load so that your expenses aren't ridiculous from hosting too many people, but here it also locks the doors on said transphobes.
- Even if it isn't, it can temporarily **close** to forbid registration.
- If they then decide to go to another instance, they firstly need to find an open one that:
  - Isn't already blacklisted by your instance.
  - Lets them onboard.
  - Has a lax enough moderation force that won't ban them immediately, or is also transphobic.
- Once they find this **unicorn** instance, they can *now* start trolling. However, if this happens repeatedly, that instance will likely start getting blacklisted as well.

Do you see the difficulty here? That third criteria alone is *ridiculous*, because if an instance has a lax enough moderation to allow for stuff like this to happen frequently, they're likely going to be blacklisted. In addition, since each instance is a *community* and as such might have bonds and connections to other instances, once it's banned on one, it will likely start getting banned on multiple others.

You might say oh, just create a new instance - however it's pretty cumbersome to do that. Firstly you need to setup the server, mastodon, and have money to spend - then you'd need to pay proportionally to the size of the trolling brigade - which starts to cost a lot of money and time if the entire server doesn't just collapse due to a rushed setup.

All this to say that, if you're someone who is tired of the bullshit lax, inconsistent, and unjust moderation - this place will be markedly better. Just shop for the right instance whose vibe and rules you like, and then sign up! Which segways into...

# Culture

This place has a **culture**. That's not surprising, every place does - but I want to elaborate on this part. Also, this isn't about each instance - many instances have *sub-cultures* due to being their own community - but I mean the overall community. See, I mentioned the moderation strategy above, and before Twitter started to end itself this place was still flourishing. As a result, many of the people who migrate here are overall the *outcasts* - people who didn't feel welcome on platforms like twitter, where many people harboured hatred for them, hatred that wasn't moderated or dealt with in any effective way.

Due to the much better moderation, and decentralized nature resulting in a much less corporate, cold, and manufactured environment - the place led to having a more personal vibe. The outcasts finally had a place to belong, people who were LGBTQ, or non-white could exist in a place, and not be exposed to constant unmoderated hatred that led to isolation. Instances are **homes**, homes we live in and make our own, and with time they will grow their own identity. **Hellsite** has an identity, being that of a chaos gremlin who tends to break things a bunch. I still remember when we accidentally caused multiple instances to lag due to some of the ridiculous changes made.

This can be reflected from how this platform had **image descriptions** and **content warning** labels before twitter even *knew* to consider those things. These were incredibly useful, and inclusive to people that the other, bigger platforms had just ignored. This place isn't **twitter** - and it shouldn't be. Twitter is both a beautiful place with its own culture, but more prominently - and increasingly lately - has become known for absolute toxicity, misery, and nothing but a vessel for the worst in humanity. Infact, for so many years it hosted a tyrant that it refused to remove - eventually doing so when his presence crescendoed into the January 6th attack on the US Capitol.

This wouldn't happen here. It could, but it wouldn't. Instances wouldn't fear to ban him due to some self-importance, and if they **do** then other instances would likely just defederate. People on said instance could also simply **migrate** - one thing about mastodon is that you can **migrate** to another instance - moving your followers and following abroad as well, including a link to your new account on the old one. It'd be much easier to isolate someone like that. I'm not saying this place is perfect - nothing is. Hell, this place can suffer from its own problems at times. I don't mean to project the fediverse as some bastion of moral perfection that eradicates darkness - however I want to show, and explain, why this place is a **massive** way forward. 

Why it is the way that it is, and why I really like it. Why I believe it to be a much better alternative to what is already out there - and why I feel like such a decentralized layout and structure to handling **society** and our social desires is a much better, and healthier way of communicating. It isn't perfect, isn't even close. But compared to Twitter, frankly, it may as well be. At least to me.

# Conclusion

I hope this has all given you a better understanding of this platform, and why I personally like it so much. It may not be for you, and that's is perfectly fine! However, in my opinion, I believe that Twitter - while being a very entertaining place, has contributed so much more pain to the world as a whole. It was an experiment, one that fed on addiction to profit from eyes on ads, and were it to go on, it may have succeeded. In some way, it might still succeed right now. While I despise Elon, at least he's gutted Twitter to the point where its death has gone from an impossibility to a very real chance.

Personally, I'm glad to see it go. It's sad, despite my criticisms it did provide good. I met some great people through it, and formed some good memories. But time turns all things to ash, and time also births new things from that ash. It was an experiment, and people deserves better than it. The Fediverse might not be what we deserve, but at the very least it's one step closer.

[See you there.](https://enbyss.com/mastodon)

**P.S.** A friend of mine made another <a class="h-card" href="https://beefox.xyz/post/another-explanation-of-the-fediverse">good post</a> on this topic if you'd like to check it out!

<p class="text-center text-6xl font-bold w-full"> ~ End ~ </p>