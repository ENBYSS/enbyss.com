---
title: Will Tracker (X!)
description: Tracks the will vote %es during a season. Also, my thoughts. (Decommissioned)
category: doc
tags:
    - blaseball
image:
    src: 'blaseball.png'
    alt: 'Will Tracker'
createdAt: 2022-12-23
updatedAt: 2022-12-23
---

<script>
    import Note from "$lib/babel/note.svelte";
    import ContentImg from "$lib/babel/content-img.svelte";
</script>

# ! Disclaimer !
Hey! This won't be like the other two. [Gift Tracker](/babel/docs/blaseball/gift-progress) was a look into a simple tool, and [Herring Reveals](/babel/docs/blaseball/herring) was a significantly more complicated look. As the final entry of the Expansion Era Documentation series, this escalates things by being a tool that *I had to delist*.

So, what was this tool? Easy - it just tracked the percentage of wills over the course of the season. *Chronicler* saves historical data, and since the Will% was publicly available in the API, it was *also* stored. In essence, this meant I just needed to get the right time period of data and display it in a human-friendly way.

Now, you might be thinking one of these things.
- ...so? Why was this worthy of a delist?
- ...eeyup.
- ...*oh*.

So, just incase you're the first kind - I'll elaborate. **Wills were very controversial.**

## An Unkind Look at Wills

So, first lets consider the state of the election for the first *many* seasons. You had **two** things - **Decrees** and **Blessings**. Decrees worked democratically - whichever got the most votes, wins. Blessings worked on *luck* - each vote was effectively a lottery ticket, and the more votes you had, the more likely you were to win. Because of this, there was something known as *Wimdying* - wherein someone with incredibly low votes somehow won the will.

<ContentImg
    src="blaseball/dale-wimdy.jpg"
    alt="A tweet showing the origin of 'Wimdy' due to the Miami Dale winning a blessing with 0% votes."
    caption="God I love the Miami Dale."
/>

Introduce **Wills** - which appeared as the *third* option. The selection of wills was the same for each team, but unlike Blessings and Decrees, each team was **guaranteed** to win at least 2 of them. They *also* worked on raffle however, so the element of randomness was still there. However, this ended up causing a lot of problems.

Consider this - with **decrees** they affect the league, however they are *explicitly* democratic. You're not going to have a rogue group hijack democracy to elect an unwanted decree. With **blessings**, most were explicitly positive, and even for the ones that your team didn't want - there's the rest of the league to offset any votes you put in.

However, with **wills** it starts to cause problems. Since each team is **forced** to get at least 2 wills, this meant that they *needed* to group up and point out the desired picks - otherwise the wrong will could be chosen. You'd think wills would be mostly positive - *however* some traded players, moved players to/from the shadows, etc.

As a result, if a rogue party wanted to go against the team, they could dump some votes and just hope they'd win the raffle - which happened *frequently*. This also led to discussions of *sabotage* by people who'd switch teams just to dump massive amounts of votes into the *wrong* will.

To summarize, **wills** were a volatile powder keg of political mayhem that caused a lot of problems. So a tool that could show the **percentages throughout a season**, and as a result show cases such as the percentage of the *wrong* will **spiking**, was problematic. I somehow didn't notice this, probably because it was still early on - and at some point had to just take it down.

That experience *sucked*, to put it lightly. I made this whole thing I was proud of, that should have been explicitly just interesting - and infact was for statheads - but instead caused pandemonium. Not blaming anyone here - if I blame anything it's the *human condition* - but this was a lesson to me about how badly things can backfire.

## Why document?

Why am I documenting it then? Well, it's been a year since Blaseball entered siesta, and realistically speaking if someone wanted to program it, they would have. Not to mention that when Blaseball comes back it'll be with a whole new API - so all of this is only useful historically. Plus, I learned how to chart data because of this tool, and I'd like to keep notes on that if I ever want to do it again.

# Init

With all that said, it's time for the code - starting with the initial state.

```js
{
    myChart: null,
    currentSeason: "Season 15",
    currentTeam: "Miami Dale",
    dataMode: "All",
    datamodes: ["All", "After Day 99", "Final Day", "Before Postseason", "Specific Day (UTC)", "Specific Range (UTC)"],
    specificDay1: "Monday",
    specificDay2: "Sunday",
    possibleDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    seasons: {
        "Season 15" : [new Date(Date.UTC(2021, 3, 5)), new Date(Date.UTC(2021, 3, 11))],
        "Season 16" : [new Date(Date.UTC(2021, 3, 12)), new Date(Date.UTC(2021, 3, 18))],
        "Season 17" : [new Date(Date.UTC(2021, 3, 19)), new Date(Date.UTC(2021, 3, 25))],
        "Season 18" : [new Date(Date.UTC(2021, 4, 10)), new Date(Date.UTC(2021, 4, 16))],
        "Season 19" : [new Date(Date.UTC(2021, 4, 17)), new Date(Date.UTC(2021, 4, 23))],
        "Season 20" : [new Date(Date.UTC(2021, 5, 14)), new Date(Date.UTC(2021, 5, 20))],
        "Season 21" : [new Date(Date.UTC(2021, 5, 21)), new Date(Date.UTC(2021, 5, 27))],
    },
    teams: { /* ...omitted... */ }
}
```

So! First we have the chart itself - which needs to be drawn correctly. Then you have expected details such as the *season* and the *team* to view details for. Next are some **modes** and any data they'd need - used to view a specific time range - such as **After Day 99**, which was when most teams voted due to having not entered the postseason.

The `seasons` object was needed due to historical data - we needed the data for *specific* time ranges, being during the season itself. As you can see I went for the *hardcoded dates* approach. Likely not the best, but hey - it worked.

# Retrieval

Since we needed to get the *relevant* data from *Chronicler*, the date ranges needed to be passed in a specific format. As a result, constructing and executing the request alone needed some logic of its own.

```js
let plotData = {};
let [startOriginal, endOriginal] = this.seasons[this.currentSeason]
let start = new Date(startOriginal.getTime());
let end = new Date(endOriginal.getTime());

start.setUTCHours(8);
end.setUTCHours(18);
end.setMinutes(15);
```

The first step is to setup a **broad** range - the entire season. This was pretty easy, just use the dates specified in the season map. However, timing was important - the season *opened* and *closed* at a specific time - so we had to update the times as a result. Here you can see the **start** time is set to **08:00UTC**, and the **end** time is set to **18:15UTC**.

Then, we need to take into consideration all the *other* modes.

```js
if (this.dataMode === "After Day 99") {
    start = new Date(start.getTime() + 4*24*60*60*1000);
    start.setUTCHours(20)
}
```

Here you can see two steps - we move forward *four* days, then we set the hour to **20**. Since games start on **Monday**, adding 4 days moves us to **Friday** - and **Friday 20:00UTC** was about the time when Day 99 ended.

<Note>

Firstly, forgive the code looking wonky. Like I said, this was way back when, and my skills were still not... honed. Secondly, `time` is a UNIX timestamp in milliseconds, measuring time since **January 1st, 1970 UTC**. So to skip four days, you need to turn four days into milliseconds - aka, turn it into hours ($\times24$), then minutes ($\times60$), seconds ($\times60$), and finally milliseconds ($\times1000$).

</Note>

```js
else if(this.dataMode === "Final Day") {
    start = new Date(start.getTime() + 6*24*60*60*1000);
    start.setUTCHours(0);
}
```

Final Day is pretty simple - it's the *start of Sunday*. So, skip forward 6 days, and set the hour to midnight.

```js
else if(this.dataMode === "Before Postseason") {
    end = new Date(start.getTime() + 4*24*60*60*1000);
    end.setUTCHours(20);
}
```

Before Postseason uses the same date as **After Day 99** - however this time it updates the **end**. Like this, you can check the calm period where most teams are biding their time until the season ends - *just incase* something happens.

```js
else if(this.dataMode === "Specific Day (UTC)") {
    const dayChosen = this.possibleDays.indexOf(this.specificDay1);
    start.setUTCHours(0);
    start = new Date(start.getTime() + dayChosen*24*60*60*1000);
    end = new Date(start.getTime() + 24*60*60*1000);
}
```

Specific Day (UTC) is where the complication starts - since here we start dealing with user inputs. However, things are still simple - if the user picks **Tuesday** for example, then we need to skip **1 day**, set the hour to **midnight**, and set the end date to **24 hours** later. Luckily, we could just use `indexOf` to see how many days we should skip, since in our case **Tuesday** is the 2nd day, so it'll be at index **1** - and so on.

```js
else if(this.dataMode === "Specific Range (UTC)") {
    console.log(this.specificDay1, this.specificDay2);
    let dayChosen1 = this.possibleDays.indexOf(this.specificDay1);
    let dayChosen2 = this.possibleDays.indexOf(this.specificDay2);

    // This can happen when transitioning from Specific Day to Specific Range. For example...
    // Range [Monday, Wednesday] - Day [Friday]
    // When switching to range it becomes [Friday, Wednesday]. This resets it to show all days like default.
    if(dayChosen1 > dayChosen2){
        this.specificDay1 = "Monday";
        this.specificDay2 = "Sunday";
        dayChosen1 = 0;
        dayChosen2 = 6;
    }

    start = new Date(start.getTime() + dayChosen1*24*60*60*1000);
    end = new Date(start.getTime() + (dayChosen2-dayChosen1+1)*24*60*60*1000);
}
```

The most complicated mode is **Specific Range (UTC)** - since now you have two inputs. Besides the `dayChosen` section which uses the same trick to see hoow many days to skip - there's an **if**. Luckily for current me, past me added a comment to explain why it's here - being that since `specificDay1` is shared by *Specific Day*, it could end up being *after* `specificDay2` - in which case we just reset to *Monday* to *Sunday*.

After that, we just need to skip forward `dayChosen1` days for the start - and for the end we need to skip by `dayChosen2-dayChosen1+1` - because `start` would have been updated by that point. The **+1** is there so that if the user specified a range of **Wednesday-Wednesday**, it would cover **24** hours instead of **0**.

After all of this, we finally perform the request.

```js
let reqUrl = `https://api.sibr.dev/chronicler/v2/versions?type=teamElectionStats&id=${this.teams[this.currentTeam]}&order=asc&after=${start.toISOString()}&before=${end.toISOString()}`
let response = await this.$axios.get(reqUrl);
let retrieved = response.data;
```

```
https://api.sibr.dev/chronicler/v2/versions?
    type=teamElectionStats&     (to only get election stats)
    id={teamId}&                (for a specific team)
    order=asc&                  (starting from the earliest)
    after={startISO}&           (after the start date)
    before={endISO}             (before the end date)
```

# Processing

Since I didn't have typescript back then, and I don't want to send a test request to Chronicler, here's a *rough* schema of the response based on how I use it.

```ts
type Response = {
    items: ElectionData[]
    nextPage: string
}

type ElectionData = {
    data: {
        wills: Will[]
    }
    validFrom: string // date
}

type Will = {
    id: string
    percent: number
}
```

Showing the usage is likely better than trying to explain it directly - so let's start there.

```js
let updatePlotData = (blaseball_data) => {
    for (let item of blaseball_data['items']) {
        for (let data of item['data']['wills']) {
            if (!(data.id in plotData)) {
                plotData[data.id] = []
            }
            plotData[data.id].push({x: (new Date(item.validFrom)).toString(), y: data.percent});
        }
    }
};
updatePlotData(retrieved);
```

...loving the Pyramid. Here you can see that we're effectively going through *all* the will data in order to store it for plotting. Each Will had an **id**, which we use to differentiate between then, then we append points based on *when* the data was valid (aka around when it was retrieved), and the *percentage* of votes it had.

In other words, `updatePlotData` effectively stores the percentages across time for each recognized will.

```js
let nextPageId = retrieved.nextPage;
while (nextPageId) {
    let retrieved = await this.$axios.get(`${reqUrl}&page=${nextPageId}`);
    updatePlotData(retrieved.data);
    nextPageId = retrieved.nextPage;
}
```

Now the response is *paginated*, so in order to get all the data we need to go through page by page. This is where we use `nextPage` - looping to request the next page until there's no more pages left. Once the loop is done, we've gotten all the data for the time range.

```js
if(this.myChart) {
    this.myChart.destroy();
}
```

...and before we start working with charts, we need to have a blank slate - so we destroy whatever chart might already be present.

# Charting

Ah, it's time for the area I completely forgot - charting! I have forgotten literally **everything** about charting, so this is as much of a learning experience for me as it is for you all.

```js
let ctx = document.getElementById('willChart').getContext("2d");

let colours = [
    "#6161FF",
    "#EB0000",
    "#49842A",
    "#BD5B00",
    "#D600BD",
    "#00854B",
    "#B61AFF",
    "#007BC7",
    "#0072EB",
]

let willIds = Object.keys(plotData);
let datasets = [];
```

Since charting works by using `<canvas>` - we need to first get the canvas we'd like to draw on. The `colours` are there so that different wills *contrast* with each other. Then you have the **willIds** and the **datasets** - needed for plotting later on.

```js
// Length of dataset starting at 0
const paddingRef = plotData[willIds[0]];
const totalPoints = paddingRef.length;

// Padding by zeroes to fix tooltips
for(let id of willIds) {
  if (plotData[id].length !== totalPoints) {
    console.warn(`${id} has less points [${plotData[id].length}] than needed [${totalPoints}] - adding padding...`);
    let i;
    const toPad = totalPoints-plotData[id].length;
    for(i = 0; i < toPad; i++) {
      plotData[id].unshift({x: paddingRef[i].x, y: 0.0});
    }
  }
}
```

Now, `paddingRef` will store the length of the dataset. However, since wills can start being voted on at any point, this means certain wills will show up *later on* - meaning there's less data points for them.
That's why we use `willIds[0]` - it will store the ID of the will that showed up *first* - and hence has the most data points.

Those wills need to be **padded** in order to be of the same length - since otherwise charting will bug out and break. In other words, instead of nothing, they'll start off being marked as **0%** until their first votes start coming in.

```js
for (let i in willIds) {
    let id = willIds[i];
    datasets.push({
        label: id,
        data: plotData[id],
        backgroundColor: colours[i],
        borderColor: colours[i],
        borderWidth: 4,
        fill: false,
        lineTension: 0
    })
}
```

Then we set up the dataset for *each* will - now of equal length each. We need the label, for which we use the **id**, the data, a colour from the array we specified earlier, and other details for cosmetics.

Finally, we configure the chart so that it can be drawn. I'm not showing the full code here because it's... very long - and at this point we're just placing values in the right places to make the graph look all pretty. Instead I'll show the final line, which displays all the effort we've put into this.

```js
this.myChart = new Chart(ctx, chartConfig);
```

...and there you go!

# Conclusion

Charting is not too complicated, infact if I used *Typescript* from the start it likely would have been much easier. That's the lesson for today. Use *typescript*.

Well, that - and also that part of being a programmer is to *consider* what consequences your project might have. Programming is a skill and artform that creates tools which allow people to do things they otherwise couldn't. Knowing how people can use your code, knowing the worst case scenario, and drawing the line at whatever you think is *acceptable* is a key part of programming - and ignorance isn't a justification.

However, even if you perfect this skill - time changes things, and something that was legitimately a good idea can easily twist into a dark version of itself. Like here, the will tracker was just a fun thing people could use to see their efforts graphed - but as time went on and wills became more of a volatile issue, it ended up becoming a source of mass paranoia.

All it was meant to be, is a visualization of past data to analyze certain events - such as seeing how conflicted a team was, or strategies like voting for a will which includes a *temporary* player on the team.

I hope this was a good read! I've been meaning to talk about this thing, since I **am** proud of it and many people really enjoyed it - and I never really got a chance to air out my thoughts about accidentally encountering the Frankienstein Effect.

<ContentImg
    src="blaseball/dog.webp"
    alt="a dog"
    caption="woof"
/>