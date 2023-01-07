<script lang="ts">
	import IpxImage from "$lib/ipx-image.svelte";
	import { image_url_for, machine_for_recipe, recipes_for, recipes_using } from "./recipe-service";
import type { Recipe } from "./recipe-utils";


    export let item: {
        name: string
        recipes: Recipe[]
    }
</script>

<div class="item-title">
    <IpxImage src={image_url_for(item.name)} alt={item.name} />
    <p class="name"> {item.name} </p>
</div>

<div class="item-usages">
    <p class="title"> Used by: </p>
    <ul>
        {#each recipes_using(item.name) as recipe}
            <li class="recipe-summary">
                <IpxImage src={image_url_for(recipe.output.name)} alt={recipe.name} />
                <span class="output-name"> {recipe.output.name} </span>
                {#if recipe.alternate}
                    <span class="recipe-name"> ({recipe.name}) </span>
                {/if}
            </li>
        {/each}
    </ul>
</div>

<ul class="item-origins">
    {#each recipes_for(item.name) as recipe}
        <li class="origin-summary">
            <p class="name"> {recipe.alternate ? recipe.name : "base"} </p>
            <p class="output-rate">
                Output rate: <span class="rate"> {recipe.output.rate} p/min </span>
            </p>
            <p class="output-method">
                From: <span class="method"> {machine_for_recipe(recipe)} </span>
            </p>
            <ul class="ingredient-list">
                {#if recipe.ingredients.length > 0}
                    <p class="title"> Ingredients </p>
                {/if}
                {#each recipe.ingredients as ingredient}
                    <li class="ingredient">
                        <IpxImage src={image_url_for(ingredient.name)} alt={ingredient.name} />
                        <span class="name"> {ingredient.name} </span>
                        <span class="rate"> {ingredient.rate} p/min </span>
                    </li>
                {/each}
            </ul>
        </li>
    {/each}
</ul>

<style lang="scss">
    .item-title {
        display: flex;
        align-items: center;
        gap: .5em;

        :global(img) {
            width: 2em;
        }

        .name {
            font-weight: 600;
            font-size: 2em;
        }
    }

    .item-usages {
        margin: .8em 0;
        .title {
            font-weight: 600;
            font-size: 1.2em;
            color: var(--pop-col-1);
        }
        .recipe-summary {
            display: flex;
            align-items: center;
            gap: .4em;
            font-size: 1em;
            :global(img) {
                width: 1em;
            }

            .recipe-name {
                color: var(--saturated-col-1);
                font-style: italic;
                font-size: .9em;
            }
        }
    }

    .item-origins {
        display: flex;
        flex-direction: column;
        gap: 1em;

        .origin-summary {
            .name {
                font-weight: 600;
                font-size: 1.2em;
                color: var(--pop-col-1);
            }
        }

        .output-rate, .output-method {
            color: var(--saturated-col-1);
            font-weight: 500;

            .rate, .method {
                font-size: .9em;
                font-style: italic;
            }
        }

        .ingredient-list {
            margin-top: .4em;

            .title {
                font-weight: 500;
            }

            .ingredient {
                display: flex;
                align-items: center;
                gap: .4em;
            }
            .name {
                font-weight: 500;
                color: var(--saturated-col-1);
                font-style: italic;
                font-size: 1em;
            }
            .rate {
                font-size: .9em;
            }
        }
    }
</style>