class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const Updater = (qualityChange, sellInChange = -1, min = 0, max = 50) => (item) => {
  item.sellIn += sellInChange;
  item.quality = clamp(item.quality + qualityChange, min, max);
}

const strategySets = [];

const Strategy = (condition, updater) => ({ condition, updater });

const registerStrategySet = (condition, strategySet) => {
  strategySets.push({
    condition,
    strategySet
  });
}

const getStrategySet = (item) => strategySets.find(strategySet => strategySet.condition(item)).strategySet

registerStrategySet(item => item.name === "Aged Brie", [
  Strategy(sellIn => sellIn >= 0, Updater(1)),
  Strategy(() => true, Updater(2))
]);

registerStrategySet(item => item.name === "Backstage passes to a TAFKAL80ETC concert", [
  Strategy(sellIn => sellIn >= 10, Updater(1)),
  Strategy(sellIn => sellIn >= 5, Updater(2)),
  Strategy(sellIn => sellIn >= 0, Updater(3)),
  Strategy(() => true, Updater(-Infinity))
])

registerStrategySet(item => item.name === "Sulfuras, Hand of Ragnaros", [
  Strategy(() => true, Updater(0, 0, -Infinity, Infinity))
]);

registerStrategySet(item => item.name === "Conjured Mana Cake", [
  Strategy(sellIn => sellIn >= 0, Updater(-2)),
  Strategy(() => true, Updater(-2))
]);

registerStrategySet(() => true, [
  Strategy(sellIn => sellIn >= 0, Updater(-1)),
  Strategy(() => true, Updater(-2))
]);

const updateItem = (item) => getStrategySet(item).find(strategy => strategy.condition(item.sellIn)).updater(item);

class Shop {
  constructor(items=[]){
    this.items = items;
  }

  updateQuality() {
    return this.items.forEach(updateItem);
  }
}


module.exports = {
  Item,
  Shop
}
