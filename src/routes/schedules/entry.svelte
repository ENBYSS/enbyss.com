<script lang="ts">
	import IpxImage from "$lib/ipx-image.svelte";

    export let time: number;
    export let name: string;
    export let subtitle: string = "";
    export let description: string = "";
    export let link: string;
    export let type: "stream" | "video";
    export let image: string;
    
    let now = Date.now();
    setInterval(() => now = Date.now(), 1000);

    let countdown = "00:00:00";
    $: if (now) {
        if (time > now) {
            const diff = time - now;

            const secs = diff / 1000;
            const mins = secs / 60;
            const hrs  = mins / 60;

            const digit = (num: number) => Math.floor(num).toLocaleString('en', { minimumIntegerDigits: 2 });

            countdown = `${digit(hrs)}:${digit(mins%60)}:${digit(secs%60)}`;
        }
    }

    const datetime = (() => {
        const seconds = Math.floor(time / 1000);
        const [hours, minutes] = [
            Math.floor(seconds / 60 / 60) % 24,
            Math.floor(seconds / 60) % 60,
        ];

        const date = new Date(time);

        const format_date = (date: number) => {
            const last_digit = date % 10;
            const with_postfix = (p: string) => `${date}${p}`

            if (last_digit === 1) return with_postfix("st");
            else if (last_digit === 2) return with_postfix("nd");
            else if (last_digit === 3) return with_postfix("rd");
            else return with_postfix("th");
        }

        const weekdays = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ];

        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ]
        
        return {
            hour: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds(),
            day: format_date(date.getDate()),
            weekday: weekdays[date.getDay()],
            month: months[date.getMonth()],
        }
    })()
</script>

<div class="item-container">
    <div class="item-image">
        <IpxImage src={image} alt={name} ipx={{ width: 120, height: 120 }} />
    </div>

    <div class="item-info">
        <div class="date">
            <p class="day"> {datetime.weekday} </p>
            <p class="full"> {datetime.day} {datetime.month} </p>
        </div>
        <div class="topic">
            <span class="name"> {name} </span>
            <span class="subtitle"> {subtitle} </span>
        </div>
        <div class="description">
            {description}
        </div>
    </div>

    {#if link.includes("youtu")}
        <a class="link youtube-link" href={link} target="_blank" rel="noreferrer">
            <div class="i-mdi:youtube"/>
        </a>
    {:else if link.includes("patreon")}
        <a class="link patreon-link" href={link} target="_blank" rel="noreferrer">
            <div class="i-mdi:patreon"/>
        </a>
    {/if}


    <div class={`item-type ${type}`}>
        {type}
    </div>

    {#if time > now}
        <div class="countdown">
            { countdown }
        </div>
    {/if}
</div>

<style lang="scss">
    .item-container {
        display: flex;
        position: relative;
        background: var(--base-col-3);
        border-radius: 1em;
        overflow: hidden;
        gap: 1em;
    }

    .item-image {
        :global(img) {
            height: 100%;
            max-width: 100px;
            object-fit: cover;
        }
    }

    .item-info {
        padding: 1em 2.5em 1em 0em;

        .date {
            .day {
                color: var(--pop-col-1);
                font-weight: 700;
                font-size: 1.1em;
            }
            .full {
                color: var(--saturated-col-1);
                font-weight: 600;
                font-size: 1.5em;
            }
        }

        .topic {
            .name {
                font-weight: 600;
                color: var(--base-col-2);
                font-size: 1em;
            }
            .subtitle {
                font-weight: 500;
                color: var(--base-col-1);
                font-size: .9em;
                font-style: italic;
            }
        }

        .description {
            font-weight: 300;
            font-size: .9em;
        }
    }

    .link {
        position: absolute;
        right: 0;
        height: 100%;
        width: 30px;
        background: var(--saturated-col-1);
        color: var(--saturated-col-3);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;

        &.youtube-link {
            filter: hue-rotate(60deg);
        }

        &:hover, &:focus {
            width: 50px;

            div {
                transform: scale(2);
            }
        }
    }

    .item-type {
        position: absolute;
        left: 0;
        bottom: 0;
        background: var(--saturated-col-3);
        color: var(--saturated-col-1);
        padding: .3em 1em;
        border-top-right-radius: .8em;

        &.video {
            filter: hue-rotate(30deg);
        }
    }

    .countdown {
        position: absolute;
        top: .5em;
        right: 3em;
        font-family: "IBM Plex Mono";
        font-size: .9em;
        color: var(--base-col-3);
        background: var(--base-col-1);
        font-weight: 700;
        padding: .1em .8em;
        border-radius: .4em;
        z-index: 1;
    }
</style>