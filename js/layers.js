addLayer("s", {
    name: "Sound", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "sound", // Name of prestige currency
    baseResource: "wawes", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('s', 13)) mult = mult.times(upgradeEffect('s', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "s: Reset for sound", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            name: "1",
            description: "1: Double your point gain.",
            cost: new Decimal(1),        
        },
        12: {
            name: "2",
            description: "2: increase your gain based on sound wawes",
            cost: new Decimal(2),
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        
        },
        13: {
            name: "3",
            description: "3: ???",
            cost: new Decimal(5),
            effect() {
                return player.points.add(1).pow(0.15)
            },
        }
    },

    layerShown(){return true}
})
