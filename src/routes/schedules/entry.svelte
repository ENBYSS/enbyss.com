<script lang="ts">
    export let time: number;
    export let name: string;
    export let subtitle: string = "";
    export let description: string = "";
    export let link: string;
    export let type: "stream" | "video";
    export let image: string;

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

<div class="flex flex-col mx-auto max-w-800px bg-base-col-3 rounded-3 p-4 z-10 relative">
    <div class="flex flex-row gap-x-4">
        <div class={`top-3 right-5 absolute py-1 px-5 rounded-2 scale-120 max-w-80px max-h-20px ${type}-schedule-tag`}>
            {type}
        </div>

        <div class="rounded-sm overflow-hidden max-w-[120px] md:mb-0 relative shrink-0">
            <img src={image} alt={name} class="rounded-3 w-120px h-120px" />
        </div>

        <div class="flex flex-col grow sm:text-left text-right">
            <div class="flex flex-row-reverse sm:flex-row justify-start gap-x-3">
                <div>
                    <button on:click={() => alert("UNIMPLEMENTED!")} class="btn flex flex-row">
                        <!-- Update when copy functionality added -->
                        {#if true}
                            <div class="i-mdi:clipboard-check inline-block text-4" />
                        {:else}
                            <div class="i-mdi:clipboard-text inline-block text-4" />
                        {/if}
                        <div class="i-ph:clock-fill inline-block text-4 ml-1" />
                    </button>
                </div>
                <div>
                    <p class="font-bold text-saturated-col-1 text-md -mb-1"> { datetime.weekday } </p>
                    <p class="font-bold text-pop-col-1 italic text-2xl"> { datetime.day } {datetime.month} </p>
                </div>
            </div>

            <p class="font-500 italic text-xl text-contrast">
                <!-- time Until -->
            </p>

            <p class="font-600 text-base-col-2">
                {name}
                <span class="italic text-saturated-col-1 font-500 text-3.7"> {subtitle} </span>
            </p>

            <p class="font-300 text-3.5 mt-1"> {description} </p>
        </div>
    </div>
    <a href={link} class="btn mt-3 py-2 rounded-2 transition duration-100 flex justify-center" target="_blank" rel="noreferrer">
        {#if link.includes("youtu")}
            <div class="i-mdi:youtube mr-2 "/> link
        {:else if link.includes("patreon")}
            <div class="i-mdi:patreon mr-2 "/> link
        {/if}
    </a>
</div>

<style lang="scss">
    .stream-schedule-tag {
        background: hsl(280 100% 20%);
        color: hsl(280 100% 90%);
    }

    .video-schedule-tag {
        background: hsl(0 100% 20%);
        color: hsl(0 100% 90%);
    }
</style>