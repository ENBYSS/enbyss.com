import type { Method, Recipe } from "./recipe-utils";
import recipes from "./recipes";

export const recipes_for = (name: string) => recipes.filter(i => i.output.name === name);
export const recipes_using = (name: string) => recipes.filter(i => i.ingredients.find(j => j.name === name));
export const all_alternates = () => recipes.filter(i => i.alternate);
export const recipes_made_with = (method: Method) => recipes.filter(i => i.type === method);

export const group_recipes_by_output = () => recipes.reduce((groups, recipe) => {
    if (recipe.output.name in groups) groups[recipe.output.name].push(recipe);
    else groups[recipe.output.name] = [recipe];
    return groups;
}, {} as {[key: string]: Recipe[]});

export const machine_for_recipe = (recipe: Recipe) => {
    return {
        "mined": () => `Miner (Mk. 1, 2, 3)`,
        "smelted": () => {
            const ingredients = recipe.ingredients.length;
            if (ingredients === 1) return "Smelter"
            else if (ingredients === 2) return "Foundry"
            else return "Unknown Smelter"
        },
        "crafted": () => {
            const ingredients = recipe.ingredients.length;
            if (ingredients === 1) return "Constructor"
            else if (ingredients === 2) return "Assembler"
            else if (ingredients === 3 || ingredients === 4) return "Manufacturer"
            else return "Unknown Crafter"
        },
        "extracted": () => {
            const output = recipe.output.name;
            if (recipe.output.name === "water")  return "Water Extractor"
            else if (recipe.output.name === "crude oil") return "Oil Extractor"
            else return "Unknown Extractor"
        },
        "refined": () => "Refinery",
        "packaged": () => "Packager",
        "blended": () => "Blender",
        "manual": () => "Gathered",
        "powerplant": () => "Nuclear Powerplant",
        "accelerated": () => "Particle Accelerator",
        "craft-bench": () => "Craft Bench",
        "equipment-workshop": () => "Equipment Workshop",
    }[recipe.type]();
}

export const image_url_for = (name: string) =>
    `https://files.enbyss.com/images/satisfactory/${name.split(' ').map(a => a.charAt(0).toUpperCase() + a.slice(1)).join('')}.webp`;