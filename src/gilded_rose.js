const minQuality = 0;
const maxQuality = 50;

const NormalUpdateStrategy = (item) => {
    item.quality = Math.max(minQuality, item.sellIn <= 0 ? item.quality - 2 : item.quality - 1);
    item.sellIn -= 1;
};

const AgedBrieUpdateStrategy = (item) => {
    item.quality = Math.min(maxQuality, item.sellIn <= 0 ? item.quality + 2 : item.quality + 1);
    item.sellIn -= 1;
};

const BackstagePassUpdateStrategy = (item) => {
    const qualityChanges = [
        { condition: (sellIn) => sellIn <= 0, qualityChange: -item.quality },
        { condition: (sellIn) => sellIn <= 5, qualityChange: 3 },
        { condition: (sellIn) => sellIn <= 10, qualityChange: 2 },
        { condition: () => true, qualityChange: 1 }
    ];

    const { qualityChange } = qualityChanges.find(({ condition }) => condition(item.sellIn));

    item.quality = Math.min(maxQuality, Math.max(minQuality, item.quality + qualityChange));
    item.sellIn -= 1;
};

const ConjuredUpdateStrategy = (item) => {
    item.quality = Math.max(minQuality, item.sellIn <= 0 ? item.quality - 4 : item.quality - 2);
    item.sellIn -= 1;
};

const NullUpdateStrategy = () => { /* do nothing*/ };

const updateStrategyLookup = {
    'Aged Brie': AgedBrieUpdateStrategy,
    'Sulfuras, Hand of Ragnaros': NullUpdateStrategy,
    'Backstage passes to a TAFKAL80ETC concert': BackstagePassUpdateStrategy,
    'Conjured Mana Cake': ConjuredUpdateStrategy,
};

const updateItem = (item) => {
    const updateStrategy = updateStrategyLookup[item.name] || NormalUpdateStrategy;
    updateStrategy(item);
};

class Item {
    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

class Shop {
    constructor(items = []) {
        this.items = items;
    }

    updateQuality() {
        return this.items.forEach(updateItem);
    }
}

module.exports = {
    Item,
    Shop
};
