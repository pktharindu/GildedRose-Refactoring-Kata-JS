const {
    BaseUpdateStrategy,
    AgedBrieUpdateStrategy,
    SulfurasUpdateStrategy,
    BackstagePassUpdateStrategy,
    ConjuredUpdateStrategy,
} = require('./update_strategies');

class Shop {
    constructor(items = []) {
        this.items = items;
        this.updateStrategyLookup = {
            'Aged Brie': new AgedBrieUpdateStrategy,
            'Sulfuras, Hand of Ragnaros': new SulfurasUpdateStrategy,
            'Backstage passes to a TAFKAL80ETC concert': new BackstagePassUpdateStrategy,
            'Conjured Mana Cake': new ConjuredUpdateStrategy,
        };
    }

    updateQuality() {
        for (const item of this.items) {
            const updateStrategy = this.updateStrategyLookup[item.name] || new BaseUpdateStrategy;

            updateStrategy.update(item);
        }

        return this.items;
    }
}

module.exports = Shop;
