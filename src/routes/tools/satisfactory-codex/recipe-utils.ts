export type Method =
    | "mined"
    | "smelted"
    | "crafted"
    | "extracted"
    | "refined"
    | "packaged"
    | "blended"
    | "manual"
    | "powerplant"
    | "accelerated"
    | "craft-bench"
    | "equipment-workshop"

type Workstation = "Craft Bench" | "Equipment Workshop";

interface UnnamedRecipe {
    type: Method
    output: Ingredient
    ingredients: Ingredient[]
    byProduct?: Ingredient
}

export class Recipe implements UnnamedRecipe {
    type: Method
    output: Ingredient
    ingredients: Ingredient[]
    byProduct?: Ingredient
    name: string
    alternate: boolean
    craftable: boolean

    setName(name: string) : Recipe {
        this.name = name
        return this;
    }

    isAlt() : Recipe {
        this.alternate = true;
        return this;
    }

    canHandcraft() : Recipe {
        this.craftable = true;
        return this;
    }

    constructor(recipe: UnnamedRecipe) {
        this.type = recipe.type;
        this.output = recipe.output;
        this.ingredients = recipe.ingredients;
        this.byProduct = recipe.byProduct;
        this.name = recipe.output.name;
        this.alternate = false;
        this.craftable = false;
    }
}

type Ingredient = {
    name: string,
    rate?: number,
    units?: number,
}

// General
export const complex = (type: Method) => (output: Ingredient, ingredients: Ingredient[], byProduct?: Ingredient) : Recipe =>
    new Recipe({type, output, ingredients, byProduct});

export const item = (name: string, rate: number, units?: number) : Ingredient => ({name, rate, units});

// Initial
export const mined = (name: string) : Recipe =>
    new Recipe({type: "mined", output: { name, rate: 60 }, ingredients: []});

export const extracted = (name: string) : Recipe => 
    new Recipe({type: "extracted", output: { name, rate: 120 }, ingredients: []});

export const manual = (name: string) : Recipe =>
    new Recipe({type: "manual", output: { name, rate: 1 }, ingredients: []});

// Simple
export const smelted = (output: Ingredient, node: Ingredient) : Recipe => 
    new Recipe({type: "smelted", output, ingredients: [node]});

export const wastedFrom = (output: Ingredient, input: Ingredient) : Recipe =>
    new Recipe({type: "powerplant", output, ingredients: [input]});

// Complex
export const foundry = (output: Ingredient, ingredients: [Ingredient, Ingredient]) : Recipe => 
    new Recipe({type: "smelted", output, ingredients})

export const crafted = (output: Ingredient, ingredients: Ingredient[]) : Recipe => 
    new Recipe({type: "crafted", output, ingredients});

export const refined = (output: Ingredient, ingredients: Ingredient[], byProduct?: Ingredient) : Recipe => 
    new Recipe({type: "refined", output, ingredients, byProduct});

export const blended = (output: Ingredient, ingredients: Ingredient[], byProduct?: Ingredient) : Recipe =>
    new Recipe({type: "blended", output, ingredients, byProduct});

export const accelerated = (output: Ingredient, ingredients: Ingredient[], byProduct?: Ingredient) : Recipe =>
    new Recipe({type: "accelerated", output, ingredients, byProduct});

export const packaged = (solid: Ingredient, liquid: Ingredient, container : string = "empty canister", compressionRatio: number = 1) : [Recipe, Recipe] => {
    const toPackage = new Recipe({
        type: "packaged",
        output: solid,
        ingredients: [
            {
                ...liquid,
                rate: solid.rate! / compressionRatio
            },
            item(container, solid.rate!),
        ]
    });

    const toUnpackage = new Recipe({
        type: "packaged",
        output: liquid,
        ingredients: [
            {
                ...solid,
                rate: liquid.rate! * compressionRatio
            },
        ],
        byProduct: item(container, liquid.rate!),
    }).setName(`unpackaged ${liquid.name}`);

    return [toPackage, toUnpackage];
}