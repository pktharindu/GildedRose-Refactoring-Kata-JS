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
    item.quality += 1;

    if (item.sellIn <= 10) {
        item.quality += 1;
    }

    if (item.sellIn <= 5) {
        item.quality += 1;
    }

    if (item.sellIn <= 0) {
        item.quality = 0;
    }

    item.quality = Math.min(maxQuality, item.quality);

    item.sellIn -= 1;
};

const ConjuredUpdateStrategy = (item) => {
    item.quality = Math.max(minQuality, item.sellIn <= 0 ? item.quality - 4 : item.quality - 2);
    item.sellIn -= 1;
};

const NullUpdateStrategy = () => {};

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
