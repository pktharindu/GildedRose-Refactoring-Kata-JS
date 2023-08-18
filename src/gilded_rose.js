const {When, Otherwise, Always, StrategySet} = require('./strategy');
const {DropToZero, NoNothing, UpdateQuality} = require('./actions');

class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

const strategies = StrategySet([
    When(item => item.name === "Aged Brie").then([
        When(item => item.sellIn > 0).then(UpdateQuality(1)),
        Otherwise(UpdateQuality(2))
    ]),

    When(item => item.name === "Backstage passes to a TAFKAL80ETC concert").then([
        When(item => item.sellIn > 10).then(UpdateQuality(1)),
        When(item => item.sellIn > 5).then(UpdateQuality(2)),
        When(item => item.sellIn > 0).then(UpdateQuality(3)),
        Otherwise(DropToZero)
    ]),

    When(item => item.name === "Sulfuras, Hand of Ragnaros").then([
        Always(NoNothing)
    ]),

    When(item => item.name === "Conjured Mana Cake").then([
        When(item => item.sellIn > 0).then(UpdateQuality(-2)),
        Otherwise(UpdateQuality(-4))
    ]),

    When(() => true).then([
        When(item => item.sellIn > 0).then(UpdateQuality(-1)),
        Otherwise(UpdateQuality(-2))
    ])
]);

class Shop {
    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        return this.items.forEach(strategies.execute);
    }
}


module.exports = {Item, Shop}
