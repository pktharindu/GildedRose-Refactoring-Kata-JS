const {When, Otherwise, Always} = require('./strategy');
const {registerStrategySet, executeStrategy} = require('./strategy_set');
const {DropToZero, NoNothing, UpQuality, DownQuality} = require('./actions');

class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

registerStrategySet(item => item.name === "Aged Brie", [
    When(item => item.sellIn > 0).then(UpQuality(1)),
    Otherwise(UpQuality(2))
]);

registerStrategySet(item => item.name === "Backstage passes to a TAFKAL80ETC concert", [
    When(item => item.sellIn > 10).then(UpQuality(1)),
    When(item => item.sellIn > 5).then(UpQuality(2)),
    When(item => item.sellIn > 0).then(UpQuality(3)),
    Otherwise(DropToZero)
])

registerStrategySet(item => item.name === "Sulfuras, Hand of Ragnaros", [
    Always(NoNothing)
]);

registerStrategySet(item => item.name === "Conjured Mana Cake", [
    When(item => item.sellIn > 0).then(DownQuality(2)),
    Otherwise(DownQuality(4))
]);

registerStrategySet(() => true, [
    When(item => item.sellIn > 0).then(DownQuality(1)),
    Otherwise(DownQuality(2))
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
