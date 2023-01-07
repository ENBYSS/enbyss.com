import { mined, smelted, foundry, refined, blended, crafted, accelerated, extracted, item, manual, packaged, Recipe, wastedFrom } from "./recipe-utils";

const recipes: Recipe[] = [
    // ore (10)
    mined("limestone"),
    mined("iron ore"),
    mined("copper ore"),
    mined("caterium ore"),
    mined("coal"),
    mined("raw quartz"),
    mined("sulfur"),
    mined("bauxite"),
    mined("S.A.M ore"),
    mined("uranium"),

    // ingots (5)
    smelted(item("iron ingot", 30), item("iron ore", 30)),
    foundry(item("iron ingot", 50), [item("iron ore", 20), item("copper ore", 20)]).setName("iron alloy ingot").isAlt(),
    refined(item("iron ingot", 65), [item("iron ore", 35), item("water", 20)]).setName("pure iron ingot").isAlt(),

    smelted(item("copper ingot", 30), item("copper ore", 30)),
    foundry(item("copper ingot", 100), [item("copper ore", 50), item("iron ore", 25)]).setName("copper alloy ingot").isAlt(),
    refined(item("copper ingot", 37.5), [item("copper ore", 15), item("water", 10)]).setName("pure copper ingot").isAlt(),
    
    smelted(item("caterium ingot", 15), item("caterium ore", 45)),
    refined(item("caterium ingot", 12), [item("caterium ore", 24), item("water", 24)]).setName("pure caterium ingot").isAlt(),

    foundry(item("steel ingot", 45), [item("iron ore", 45), item("coal", 45)]),
    foundry(item("steel ingot", 100), [item("iron ore", 75), item("petroleum coke", 75)]).setName("coke steel ingot").isAlt(),
    foundry(item("steel ingot", 37.5), [item("iron ore", 22.5), item("compacted coal", 11.25)]).setName("compacted steel ingot").isAlt(),
    foundry(item("steel ingot", 60), [item("iron ingot", 40), item("coal", 40)]).setName("solid steel ingot").isAlt(),

    foundry(item("aluminum ingot", 60), [item("aluminum scrap", 90), item("silica", 75)]),
    smelted(item("aluminum ingot", 30), item("aluminum scrap", 60)).setName("pure aluminum ingot").isAlt(),

    // minerals (7)
    crafted(item("concrete", 15), [item("limestone", 45)]),
    crafted(item("concrete", 25), [item("silica", 7.5), item("limestone", 30)]).setName("fine concrete").isAlt(),
    crafted(item("concrete", 45), [item("limestone", 50), item("rubber", 10)]).setName("rubber concrete").isAlt(),
    crafted(item("concrete", 80), [item("limestone", 120), item("water", 100)]).setName("wet concrete").isAlt(),

    crafted(item("quartz crystal", 22.5), [item("raw quartz", 37.5)]),
    refined(item("quartz crystal", 52.5), [item("raw quartz", 67.5), item("water", 37.5)]).setName("pure quartz crystal").isAlt(),

    crafted(item("silica", 37.5), [item("raw quartz", 22.5)]),
    crafted(item("silica", 26.25), [item("raw quartz", 11.25), item("limestone", 18.75)]).setName("cheap silica").isAlt(),

    crafted(item("copper powder", 50), [item("copper ingot", 300)]),

    refined(item("polymer resin", 130), [item("crude oil", 60)], item("heavy oil residue", 20)).isAlt(),

    refined(item("petroleum coke", 120), [item("heavy oil residue", 40)]),

    refined(item("aluminum scrap", 240), [item("alumina solution", 240), item("coal", 120)], item("water", 120)),
    refined(item("aluminum scrap", 300), [item("alumina solution", 180), item("petroleum coke", 60)], item("water", 105)).setName("electrode - aluminum scrap").isAlt(),
    refined(item("aluminum scrap", 300), [item("bauxite", 150), item("coal", 100), item("sulfuric acid", 50), item("water", 60)], item("water", 50)).setName("instant scrap").isAlt(),

    // aliens (2)
    crafted(item("alien protein", 20), [item("hatcher remains", 20)]).setName("hatcher protein"),
    crafted(item("alien protein", 20), [item("hog remains", 20)]).setName("hog protein"),
    crafted(item("alien protein", 20), [item("plasma spitter remains", 20)]).setName("plasma spitter protein"),
    crafted(item("alien protein", 20), [item("stinger remains", 20)]).setName("stinger protein"),

    crafted(item("alien DNA capsule", 10), [item("alien protein", 10)]),

    // liquids (10)
    extracted("crude oil"),
    ...packaged(item("packaged oil", 30), item("crude oil", 60)),

    extracted("water"),
    ...packaged(item("packaged water", 60), item("water", 120)),
    
    refined(item("heavy oil residue", 40), [item("crude oil", 30)], item("polymer resin", 20)).isAlt(),
    ...packaged(item("packaged heavy oil residue", 30), item("heavy oil residue", 20)),

    refined(item("fuel", 40), [item("crude oil", 60)], item("polymer resin", 30)),
    refined(item("fuel", 40), [item("heavy oil residue", 60)]).setName("residual fuel").isAlt(),
    ...packaged(item("packaged fuel", 40), item("fuel", 60)),

    refined(item("liquid biofuel", 60), [item("solid biofuel", 90), item("water", 45)]),
    ...packaged(item("packaged liquid biofuel", 40), item("liquid biofuel", 60)),
    
    refined(item("turbofuel", 18.75), [item("fuel", 22.5), item("compacted coal", 15)]),
    refined(item("turbofuel", 30), [item("heavy oil residue", 37.5), item("compacted coal", 30)]).setName("turbo heavy fuel").isAlt(),
    blended(item("turbofuel", 45), [item("fuel", 15), item("heavy oil residue", 30), item("sulfur", 22.5), item("petroleum coke", 22.5)]).setName("turbo blend fuel").isAlt(),
    ...packaged(item("packaged turbofuel", 20), item("turbofuel", 20)),

    refined(item("alumina solution", 120), [item("bauxite", 120), item("water", 180)], item("silica", 50)),
    ...packaged(item("packaged alumina solution", 120), item("alumina solution", 120)),

    refined(item("sulfuric acid", 50), [item("sulfur", 50), item("water", 50)]),
    ...packaged(item("packaged sulfuric acid", 40), item("sulfuric acid", 60)),

    blended(item("nitric acid", 30), [item("nitrogen gas", 120), item("water", 30), item("iron plate", 10)]),
    ...packaged(item("packaged sulfuric acid", 30), item("nitric acid", 20), "empty fluid tank"),

    // gas
    extracted("nitrogen gas"),
    ...packaged(item("packaged nitrogen gas", 60), item("nitrogen gas", 240), "empty fluid tank", 4),

    // standard parts (16)
    crafted(item("iron rod", 15), [item("iron ingot", 15)]),
    crafted(item("iron rod", 48), [item("steel ingot", 12)]).setName("steel rod").isAlt(),

    crafted(item("screw", 40), [item("iron rod", 10)]),
    crafted(item("screw", 50), [item("iron ingot", 12.5)]).setName("cast screw").isAlt(),
    crafted(item("screw", 260), [item("steel beam", 5)]).setName("steel screw").isAlt(),

    crafted(item("iron plate", 20), [item("iron ingot", 30)]),
    crafted(item("iron plate", 75), [item("iron ingot", 50), item("plastic", 10)]).setName("coated iron plate").isAlt(),
    crafted(item("iron plate", 45), [item("steel ingot", 7.5), item("plastic", 5)]).setName("steel coated plate").isAlt(),

    crafted(item("reinforced iron plate", 5), [item("iron plate", 30), item("screw", 60)]),
    crafted(item("reinforced iron plate", 3.75), [item("iron plate", 11.25), item("rubber", 3.75)]).setName("adhered iron plate").isAlt(),
    crafted(item("reinforced iron plate", 15), [item("iron plate", 90), item("screw", 250)]).setName("bolted iron plate").isAlt(),
    crafted(item("reinforced iron plate", 5.63),[item("iron plate", 18.75), item("wire", 37.5)]).setName("stitched iron plate").isAlt(),

    crafted(item("copper sheet", 10), [item("copper ingot", 20)]),
    crafted(item("copper sheet", 22.5), [item("copper ingot", 22.5), item("water", 22.5)]).setName("steamed copper sheet").isAlt(),

    crafted(item("alclad aluminum sheet", 30), [item("aluminum ingot", 30), item("copper ingot", 10)]),

    crafted(item("aluminum casing", 60), [item("aluminum ingot", 90)]),
    crafted(item("aluminum casing", 112.5), [item("aluminum ingot", 150), item("copper ingot", 75)]).setName("alclad casing").isAlt(),

    crafted(item("steel pipe", 20), [item("steel ingot", 30)]),

    crafted(item("steel beam", 15), [item("steel ingot", 60)]),

    crafted(item("encased industrial beam", 6), [item("steel beam", 24), item("concrete", 30)]),
    crafted(item("encased industrial beam", 4), [item("steel pipe", 28), item("concrete", 20)]).setName("encased industrial pipe").isAlt(),

    crafted(item("modular frame", 2), [item("reinforced iron plate", 3), item("iron rod", 12)]),
    crafted(item("modular frame", 5), [item("reinforced iron plate", 7.5), item("screw", 140)]).setName("bolted frame").isAlt(),
    crafted(item("modular frame", 3), [item("reinforced iron plate", 2), item("steel pipe", 10)]).setName("steeled frame").isAlt(),

    crafted(item("heavy modular frame", 2), [item("modular frame", 10), item("steel pipe", 30), item("encased industrial beam", 10), item("screw", 200)]),
    crafted(item("heavy modular frame", 2.81), [item("modular frame", 8), item("encased industrial beam", 9.38), item("steel pipe", 33.75), item("concrete", 20.63)]).setName("heavy encased frame").isAlt(),
    crafted(item("heavy modular frame", 3.75), [item("modular frame", 18.75), item("encased industrial beam", 11.25), item("rubber", 75), item("screw", 390)]).setName("heavy flexible frame").isAlt(),

    blended(item("fused modular frame", 1.5), [item("heavy modular frame", 1.5), item("aluminum casing", 75), item("nitrogen gas", 37.5)]),
    blended(item("fused modular frame", 3), [item("heavy modular frame", 3), item("aluminum ingot", 150), item("nitric acid", 24), item("fuel", 30)]).setName("heat-fused frame").isAlt(),

    crafted(item("fabric", 15), [item("mycelia", 15), item("biomass", 75)]),
    refined(item("fabric", 30), [item("polymer resin", 30), item("water", 30)]).setName("polyester fabric").isAlt(),

    refined(item("plastic", 20), [item("crude oil", 30)], item("heavy oil residue", 10)),
    refined(item("plastic", 20), [item("polymer resin", 60), item("water", 20)]).setName("residual plastic"),
    refined(item("plastic", 60), [item("rubber", 30), item("fuel", 30)]).setName("recycled plastic").isAlt(),

    refined(item("rubber", 20), [item("crude oil", 30)], item("heavy oil residue", 20)),
    refined(item("rubber", 20), [item("polymer resin", 40), item("water", 40)]).setName("residual rubber"),
    refined(item("rubber", 60), [item("plastic", 30), item("fuel", 30)]).setName("recycled rubber").isAlt(),

    // industrial parts (7)
    crafted(item("rotor", 4), [item("iron rod", 20), item("screw", 100)]),
    crafted(item("rotor", 11.25), [item("copper sheet", 22.5), item("screw", 195)]).setName("copper rotor").isAlt(),
    crafted(item("rotor", 5), [item("steel pipe", 10), item("wire", 30)]).setName("steel rotor").isAlt(),

    crafted(item("stator", 5), [item("steel pipe", 15), item("wire", 40)]),
    crafted(item("stator", 8), [item("steel pipe", 16), item("quickwire", 60)]).setName("quickwire stator").isAlt(),

    blended(item("battery", 20), [item("sulfuric acid", 50), item("alumina solution", 40), item("aluminum casing", 20)], item("water", 30)),
    crafted(item("battery", 30), [item("sulfur", 45), item("alclad alluminum sheet", 52.5), item("plastic", 60), item("wire", 90)]).setName("classic battery").isAlt(),

    crafted(item("motor", 5), [item("rotor", 10), item("stator", 10)]),
    crafted(item("motor", 7.5), [item("electromagnetic control rod", 3.75), item("rotor", 7.5)]).setName("electric motor").isAlt(),
    crafted(item("motor", 7.5), [item("rotor", 3.75), item("stator", 3.75), item("crystal oscillator", 1.25)]).setName("rigour motor").isAlt(),

    crafted(item("heat sink", 7.5), [item("alclad aluminum sheet", 37.5), item("copper sheet", 22.5)]),
    crafted(item("heat sink", 10), [item("aluminum casing", 30), item("rubber", 30)]).setName("heat exchanger").isAlt(),

    blended(item("cooling system", 6), [item("heat sink", 12), item("rubber", 12), item("water", 30), item("nitrogen gas", 150)]),
    blended(item("cooling system", 3.75), [item("heat sink", 9.38), item("motor", 1.88), item("nitrogen gas", 45)]).setName("cooling device").isAlt(),

    crafted(item("turbo motor", 1.88), [item("cooling system", 7.5), item("radio control unit", 3.75), item("motor", 7.5), item("rubber", 45)]),
    crafted(item("turbo motor", 2.81), [item("motor", 6.56), item("radio control unit", 8.44), item("electromagnetic control rod", 4.69), item("rotor", 6.56)]).setName("turbo electric motor").isAlt(),
    crafted(item("turbo motor", 3.75), [item("motor", 7.5), item("pressure conversion cube", 1.88), item("packaged nitrogen gas", 45), item("stator", 15)]).setName("turbo pressure motor").isAlt(),

    // electronics (6)
    crafted(item("wire", 30), [item("copper ingot", 15)]),
    crafted(item("wire", 120), [item("caterium ingot", 15)]).setName("caterium wire").isAlt(),
    crafted(item("wire", 90), [item("copper ingot", 12), item("caterium ingot", 3)]).setName("fused wire").isAlt(),
    crafted(item("wire", 22.5), [item("iron ingot", 12.5)]).setName("iron wire").isAlt(),

    crafted(item("cable", 30), [item("wire", 60)]),
    refined(item("cable", 67.5), [item("wire", 37.5), item("heavy oil residue", 15)]).setName("coated cable").isAlt(),
    crafted(item("cable", 100), [item("wire", 45), item("rubber", 30)]).setName("insulated cable").isAlt(),
    crafted(item("cable", 27.5), [item("quickwire", 7.5), item("rubber", 5)]).setName("quickwire cable").isAlt(),

    crafted(item("quickwire", 60), [item("caterium ingot", 12)]),
    crafted(item("quickwire", 90), [item("caterium ingot", 7.5), item("copper ingot", 37.5)]).setName("fused quickwire").isAlt(),

    crafted(item("circuit board", 7.5), [item("copper sheet", 15), item("plastic", 30)]),
    crafted(item("circuit board", 8.75), [item("plastic", 12.5), item("quickwire", 37.5)]).setName("caterium circuit board").isAlt(),
    crafted(item("circuit board", 5), [item("rubber", 30), item("petroleum coke", 45)]).setName("electrode circuit board").isAlt(),
    crafted(item("circuit board", 12.5), [item("copper sheet", 27.5), item("silica", 27.5)]).setName("silicon circuit board").isAlt(),

    crafted(item("ai limiter", 5), [item("copper sheet", 25), item("quickwire", 100)]),

    crafted(item("high-speed connector", 3.75), [item("quickwire", 210), item("cable", 37.5), item("circuit board", 3.75)]),
    crafted(item("high-speed connector", 3), [item("quickwire", 90), item("silica", 37.5), item("circuit board", 3)]).setName("silicon high-speed connector").isAlt(),

    // communications (4)
    crafted(item("computer", 2.5), [item("circuit board", 25), item("cable", 22.5), item("plastic", 45), item("screw", 130)]),
    crafted(item("computer", 3.75), [item("circuit board", 26.25), item("quickwire", 105), item("rubber", 45)]).setName("caterium computer").isAlt(),
    crafted(item("computer", 2.81), [item("circuit board", 7.5), item("crystal oscillator", 2.81)]).setName("crystal oscillator").isAlt(),

    crafted(item("supercomputer", 1.88), [item("computer", 3.75), item("ai limiter", 3.75), item("high-speed connector", 5.63), item("plastic", 52.5)]),
    crafted(item("supercomputer", 3), [item("radio control unit", 9), item("cooling system", 9)]).setName("oc supercomputer").isAlt(),
    crafted(item("supercomputer", 2.4), [item("computer", 3.6), item("electromagnetic control rod", 2.4), item("battery", 24), item("wire", 54)]).setName("super-state computer").isAlt(),

    crafted(item("radio control unit", 2.5), [item("aluminum casing", 40), item("crystal oscillator", 1.25), item("computer", 1.25)]),
    crafted(item("radio control unit", 3.75), [item("heat sink", 15), item("high-speed connector", 7.5), item("quartz crystal", 45)]).setName("radio connection unit").isAlt(),
    crafted(item("radio control unit", 4.5), [item("crystal oscillator", 1.5), item("circuit board", 15), item("aluminum casing", 90), item("rubber", 45)]).setName("radio control system").isAlt(),

    crafted(item("crystal oscillator", 1), [item("quartz crystal", 18), item("cable", 14), item("reinforced iron plate", 2.5)]),
    crafted(item("crystal oscillator", 1.88), [item("quartz crystal", 18.75), item("rubber", 13.13), item("ai limiter", 1.88)]).setName("insulated quartz oscillator").isAlt(),

    // containers (3)
    crafted(item("empty canister", 60), [item("plastic", 30)]),
    crafted(item("empty canister", 60), [item("iron plate", 30), item("copper sheet", 15)]).setName("coated iron canister").isAlt(),
    crafted(item("empty canister", 40), [item("steel ingot", 60)]).setName("steel canister").isAlt(),

    crafted(item("empty fluid tank", 60), [item("aluminum ingot", 60)]),
    
    crafted(item("pressure conversion cube", 1), [item("fused modular frame", 1), item("radio control unit", 2)]),

    // fuels (14?)
    manual("leaves"),
    manual("mycelia"),
    manual("flower petals"),
    manual("wood"),

    crafted(item("biomass", 1500), [item("alien protein", 15)]).setName("biomass (alien protein)"),
    crafted(item("biomass", 60), [item("leaves", 120)]).setName("biomass (leaves)"),
    crafted(item("biomass", 150), [item("mycelia", 15)]).setName("biomass (mycelia)"),
    crafted(item("biomass", 300), [item("wood", 60)]).setName("biomass (wood)"),

    crafted(item("compacted coal", 25), [item("coal", 25), item("sulfur", 25)]).isAlt(),

    crafted(item("solid biofuel", 60), [item("biomass", 120)]),

    crafted(item("uranium fuel rod", 0.4), [item("encased uranium cell", 20), item("encased industrial beam", 1.2), item("electromagnetic control rod", 2)]),
    crafted(item("uranium fuel rod", 0.6), [item("encased uranium cell", 20), item("electromagnetic control rod", 2), item("crystal oscillator", 0.6), item("beacon", 1.2)]).setName("uranium fuel unit").isAlt(),

    crafted(item("plutonium fuel rod", 0.25), [item("encased plutonium cell", 7.5), item("steel beam", 4.5), item("electromagnetic control rod", 1.5), item("heat sink", 2.5)]),
    crafted(item("plutonium fuel rod", 0.50), [item("encased plutonium cell", 10), item("pressure conversion cube", 0.5)]).setName("plutonium fuel unit").isAlt(),
    
    // consumed (6)
    crafted(item("black powder", 30), [item("coal", 15), item("sulfur", 15)]),
    crafted(item("black powder", 15), [item("sulfur", 7.5), item("compacted coal", 3.75)]).setName("fine black powder").isAlt(),

    refined(item("smokeless powder", 20), [item("black powder", 20), item("heavy oil residue", 10)]),

    crafted(item("gas filter", 7.5), [item("coal", 37.5), item("rubber", 15), item("fabric", 15)]),

    crafted(item("color cartridge", 100), [item("flower petals", 50)]),

    crafted(item("beacon", 7.5), [item("iron plate", 22.5), item("iron rod", 7.5), item("wire", 112.5), item("cable", 15)]),
    crafted(item("beacon", 10), [item("steel beam", 2), item("steel pipe", 8), item("crystal oscillator", 0.5)]).setName("crystal beacon").isAlt(),

    crafted(item("iodine infused filter", 3.75), [item("gas filter", 3.75), item("quickwire", 30), item("aluminum casing", 3.75)]),

    // ammos (12)
    crafted(item("iron rebar", 15), [item("iron rod", 15)]),

    crafted(item("stun rebar", 10), [item("iron rebar", 10), item("quickwire", 50)]),

    crafted(item("shatter rebar", 5), [item("iron rebar", 10), item("quartz crystal", 15)]),

    crafted(item("explosive rebar", 5), [item("iron rebar", 10), item("smokeless powder", 10), item("steel pipe", 10)]),

    crafted(item("rifle ammo", 75), [item("copper sheet", 15), item("smokeless powder", 10)]),

    crafted(item("homing rifle ammo", 25), [item("rifle ammo", 50), item("high-speed connector", 2.5)]),

    crafted(item("turbo rifle ammo", 250), [item("rifle ammo", 125), item("aluminum casing", 15), item("turbofuel", 15)]),
    crafted(item("turbo rifle ammo", 250), [item("rifle ammo", 125), item("aluminum casing", 15), item("packaged turbofuel", 15)]),

    crafted(item("nobelisk", 10), [item("black powder", 20), item("steel pipe", 20)]),

    crafted(item("gas nobelisk", 5), [item("nobelisk", 5), item("biomass", 50)]),

    crafted(item("pulse nobelisk", 5), [item("nobelisk", 5), item("crystal oscillator", 1)]),

    crafted(item("cluster nobelisk", 2.5), [item("nobelisk", 7.5), item("smokeless powder", 10)]),

    crafted(item("nuke nobelisk", 0.5), [item("nobelisk", 2.5), item("encased uranium cell", 10), item("smokeless powder", 5), item("ai limiter", 3)]),


    // nuclear (5)
    crafted(item("electromagnetic control rod", 4), [item("stator", 6), item("ai limiter", 4)]),
    crafted(item("electromagnetic control rod", 8), [item("stator", 8), item("high-speed connector", 4)]).setName("electromagnetic connection rod").isAlt(),

    blended(item("encased uranium cell", 25), [item("uranium", 50), item("concrete", 15), item("sulfuric acid", 40)], item("sulfuric acid", 10)),
    crafted(item("encased uranium cell", 20), [item("uranium", 25), item("silica", 15), item("sulfur", 25), item("quickwire", 75)]).setName("infused uranium cell").isAlt(),

    blended(item("non-fissile uranium", 50), [item("uranium", 37.5), item("silica", 25), item("nitric acid", 15), item("sulfuric", 15)], item("water", 15)),
    blended(item("non-fissile uranium", 100), [item("uranium", 25), item("uranium waste", 25), item("nitric acid", 15), item("sulfuric acid", 25)], item("water", 40)).setName("fertile uranium").isAlt(),

    accelerated(item("plutonium pellet", 30), [item("non-fissile uranium", 100), item("uranium waste", 25)]),

    crafted(item("encased plutonium cell", 5), [item("plutonium pellet", 10), item("concrete", 20)]),
    accelerated(item("encased plutonium cell", 10), [item("non-fissile uranium", 75), item("aluminum casing", 10)]).setName("instant plutonium cell").isAlt(),

    // waste (2)
    wastedFrom(item("uranium waste", 10), item("uranium fuel rod", 0.2)),
    wastedFrom(item("plutonium waste", 1), item("plutonium fuel rod", 0.1)),

    // special (14)
    manual("blue power slug"),
    manual("yellow power slug"),
    manual("purple power slug"),

    crafted(item("power shard", 7.5), [item("blue power slug", 7.5)]),
    crafted(item("power shard", 10), [item("yellow power slug", 5)]),
    crafted(item("power shard", 12.5), [item("purple power slug", 2.5)]),

    // project assembly
    crafted(item("smart plating", 2), [item("reinforced iron plate", 2), item("rotor", 2)]),
    crafted(item("smart plating", 5), [item("reinforced iron plate", 2.5), item("rotor", 2.5), item("plastic", 7.5)]).setName("plastic smart plating").isAlt(),

    crafted(item("versatile framework", 5), [item("modular frame", 2.5), item("steel beam", 30)]),
    crafted(item("versatile framework", 7.5), [item("modular frame", 3.75), item("steel beam", 22.5), item("rubber", 30)]).setName("flexible framework").isAlt(),

    crafted(item("automated wiring", 2.5), [item("stator", 2.5), item("cable", 50)]),
    crafted(item("automated wiring", 7.5), [item("stator", 3.75), item("wire", 75), item("high-speed connector", 1.88)]).setName("automated speed wiring").isAlt(),

    crafted(item("modular engine", 1), [item("motor", 2), item("rubber", 15), item("smart plating", 2)]),

    crafted(item("adaptive control unit", 1), [item("automated wiring", 7.5), item("circuit board", 5), item("heavy modular frame", 1), item("computer", 1)]),

    crafted(item("assembly director system", 0.75), [item("adaptive control unit", 1.5), item("supercomputer", 0.75)]),

    crafted(item("magnetic field generator", 1), [item("versatile framework", 2.5), item("electromagnetic control rod", 1), item("battery", 5)]),

    crafted(item("thermal propulsion rocket", 1), [item("modular engine", 2.5), item("turbo motor", 1), item("cooling system", 3), item("fused modular frame", 1)]),

    accelerated(item("nuclear pasta", 0.5), [item("copper powder", 100), item("pressure conversion cube", 0.5)]),
]

export default recipes;