const {When, Otherwise, Always} = require('./strategy');
const {registerStrategySet, executeStrategy} = require('./strategy_set');
const {DropToZero, NoNothing, UpdateQuality} = require('./actions');

class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

registerStrategySet(item => item.name === "Aged Brie", [
    When(item => item.sellIn > 0).then(UpdateQuality(1)),
    Otherwise(UpdateQuality(2))
]);

registerStrategySet(item => item.name === "Backstage passes to a TAFKAL80ETC concert", [
    When(item => item.sellIn > 10).then(UpdateQuality(1)),
    When(item => item.sellIn > 5).then(UpdateQuality(2)),
    When(item => item.sellIn > 0).then(UpdateQuality(3)),
    Otherwise(DropToZero)
])

registerStrategySet(item => item.name === "Sulfuras, Hand of Ragnaros", [
    Always(NoNothing)
]);

registerStrategySet(item => item.name === "Conjured Mana Cake", [
    When(item => item.sellIn > 0).then(UpdateQuality(-2)),
    Otherwise(UpdateQuality(-4))
]);

registerStrategySet(() => true, [
    When(item => item.sellIn > 0).then(UpdateQuality(-1)),
    Otherwise(UpdateQuality(-2))
]);

class Shop {
    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        return this.items.forEach(executeStrategy);
    }
}


module.exports = {Item, Shop}
