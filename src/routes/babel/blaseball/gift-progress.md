---
title: Gift Progress (X)
description: A tool I made to list the progress of certain gifts in the gift shop. (Decommissioned)
category: doc
tags:
    - blaseball
image:
    src: 'blaseball.png'
    alt: 'Blaseball Gift Progress'
createdAt: 2022-12-07
updatedAt: 2022-12-07
---

Hey! Decided that since Blaseball is coming back, and my tools are effectively dead due to an impending radical change (in addition to being outdated logic - updated my site so...) - I might as well document my tools to share knowledge I've gained. Maybe it'll help, even if APIs change significantly. One thing however - I likely won't be documenting the *design*, meaning the HTML/CSS. That's more of a personal design choice that depends on external CSS, including *tailwind* as well. 

Especially because I've migrated from using *tailwind* to *UnoCSS* heh.

<Note>

Just know that my site uses Vue - specifically **Nuxt**. These tools were written back when I used **Nuxt 2** with **JS**, though now I'm using **Nuxt 3**. As a result it'll help to have familiarity with Nuxt or Vue, but I'll try my best to present the logic as platform-agnostic as possible.

</Note>

# Initial data

So, first of all we have the **initial data** to shape the state of the tool. This includes *constants* that are usually derived from the sites logic.

```json
{
    selectedTeam: null,
    giftTiers: [1 * 10e5, 3 * 10e5, 9 * 10e5, 27 * 10e5, 81 * 10e5],
    teamGiftProgress: [],
    teams: {
        "b63be8c2-576a-4d6e-8daf-814f8bcea96f" : "Miami Dale",
        "878c1bf6-0d21-4659-bfee-916c8314d69c" : "LA Unlimited Tacos",
        "ca3f1c8c-c025-4d8e-8eef-5be6accbeb16" : "Chicago Firefighters",
        "747b8e4a-7e50-4638-a973-ea7950a3e739" : "Hades Tigers",
        "d9f89a8a-c563-493e-9d64-78e4f9a55d4a" : "Atlantis Georgias",
        "a37f9158-7f82-46bc-908c-c9e2dda7c33b" : "Breckenridge Jazz Hands",
        "c73b705c-40ad-4633-a6ed-d357ee2e2bcf" : "Tokyo Lift",
        "57ec08cc-0411-4643-b304-0e80dbc15ac7" : "Mexico City Wild Wings",
        "b024e975-1c4a-4575-8936-a3754a08806a" : "Dallas Steaks",
        "23e4cbc1-e9cd-47fa-a35b-bfa06f726cb7" : "Philly Pies",
        "9debc64f-74b7-4ae1-a4d6-fce0144b6ea5" : "Houston Spies",
        "bb4a9de5-c924-4923-a0cb-9d1445f1ee5d" : "Ohio Worms",
        "3f8bbb15-61c0-4e3f-8e4a-907a5fb1565e" : "Boston Flowers",
        "f02aeae2-5e6a-4098-9842-02d2273f25c7" : "Hellmouth Sunbeams",
        "46358869-dce9-4a01-bfba-ac24fc56f57e" : "Core Mechanics",
        "b72f3061-f573-40d7-832a-5ad475bd7909" : "San Francisco Lovers",
        "36569151-a2fb-43c1-9df7-2df512424c82" : "New York Millenials",
        "105bc3ff-1320-4e37-8ef0-8d595cb95dd0" : "Seattle Garages",
        "eb67ae5e-c4bf-46ca-bbbc-425cd34182ff" : "Canada Moist Talkers",
        "adc5b394-8f76-416d-9ce9-813706877b84" : "Kansas City Breath Mints",
        "7966eb04-efcc-499b-8f03-d13916330531" : "Yellowstone Magic",
        "979aee4a-6d80-4863-bf1c-ee1a78e06024" : "Hawai'i Fridays",
        "bfd38797-8404-4b38-8b82-341da28b1f83" : "Charleston Shoe Thieves",
        "8d87c468-699a-47a8-b40d-cfb73a5660ad" : "Baltimore Crabs",
    }
}
```

Now that's a lot, but it's also simple. 

- **Gift Tiers:** How gifts worked was by having other teams *fund* you, and each subsequent gift ends up costing exponentially more. For example, the first gift costs **1 million** coins, the second costs **3 million**. In other words, $$3^n \cdot 10^6$$ where $n$ is the gift number.
- **Teams:** This is pretty easy - it just maps each ID to the appropriate team so that we can know *what* team we're actually tracking progress for.

The other two need to be populated by *logic*, so they're initialized as empty. Let's get to that.

# API request

So, the way to get data is by pinging the API - however due to **CORS** we're unable to use the Blaseball API directly. So, here we use SIBR's CORS proxy.

```js
let progress = await this.$axios.get("https://api.sibr.dev/corsmechanics/www.blaseball.com/database/giftProgress");
let allTeams = await this.$axios.get("https://api.sibr.dev/corsmechanics/www.blaseball.com/database/allTeams");
```

Here we're retrieving the data for **all teams** and the **gift progress**. The latter is useful *specifically* due to the **FREE_GIFT** modifier - which would grant a free gift at the end of the season.

```js
for (let team of allTeams.data) {
    if (team.permAttr.includes("FREE_GIFT")) {
        freeGiftTeams.push(team.id);
    }
}
```

Keeping track of these is useful both to show the modifier, *and* to include an **extra gift**. The rest of the logic just uses the **`progress`**.

So, first we have to extract the **useful** data from `progress` - specifically the *wishlists* which define which gifts will be achieved, and the *progress* which defines well... the progress.

```js
let teamProgress = progress.data.teamProgress;
let teamWishLists = progress.data.teamWishLists;
```

Using these, we can construct a list of all the teams as well as the information that's going to be useful.

```js
const formattedTeamProgress = [];

for (let team in teamProgress) {
    if (teamWishLists[team] === undefined) {
        console.warn("Couldn't find wishlist for: ", this.teams[team]);
        continue;
    }
    formattedTeamProgress.push({
        name: this.teams[team],
        total: teamProgress[team].total,
        toNext: teamProgress[team].toNext,
        wishlists: teamWishLists[team],
        hasFreeGift: freeGiftTeams.includes(team),
    });
}
```

First we should be sure that a wishlist exists for a given team and log a warning if it doesn't. Normally it *should*, but it's best to be safe and not blow up if something unexpected happened. Afterwards, we store everything useful:

- **name:** The name of the team.
- **total:** The amount of gifts the team is currently set to win (excluding *free gift*)
- **toNext:** The progress towards achieving the next gift. (as a *percentage*)
- **wishlists:** The team's wishlist.
- **hasFreeGift:** ...well, self-explanatory.

Once we have all of this, `teamGiftProgress` can finally be set to this value:

```js
this.teamGiftProgress = formattedTeamProgress;
```

Now, real quick - **toNext** is a percentage, so to know how many coins are next we need to use the constant `giftTiers`. Now if we do `giftTiers[total]`, we actually get the amount of coins needed to get the next tier (for example if `total=0` then `giftTiers[total] = 1 million` - which is the required amount to get the **1st** gift)

As a result, we can do `giftTiers[total] * toNext` to get the current amount of coin funded, and conversely `giftTiers[total] * (1-toNext)` to get how much *more* is required to get the next gift.

# Conclusion

Welp, it's that easy! Everything else is UX specific, such as deciding how to organize the data and allowing the user to pick a *specific* team to focus on that instead of every team. The core logic is quite simple, just pinging the API and formatting the received data so that it's ready to be used and present. Hope this was uh, interesting!