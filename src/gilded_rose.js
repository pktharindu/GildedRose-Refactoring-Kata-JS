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

const UpBy1 = Updater(1);
const UpBy2 = Updater(2);
const UpBy3 = Updater(3);
const Nullify = Updater(-Infinity);
const Noop = Updater(0, 0, -Infinity, Infinity);
const DownBy1 = Updater(-1);
const DownBy2 = Updater(-2);
const DownBy4 = Updater(-4);

const strategySets = [];

const When = (condition) => {
    return {
        condition,
        updater: () => {},
        then: action => this.updater = action
    }
}

const Otherwise = (updater) => {
  return {
    condition: () => true,
    updater
  }
}

const Allways = Otherwise

const registerStrategySet = (condition, strategySet) => {
  strategySets.push({
    condition,
    strategySet
  });
}

const getStrategySet = (item) => strategySets.find(strategySet => strategySet.condition(item)).strategySet

registerStrategySet(item => item.name === "Aged Brie", [
  When(sellIn => sellIn >= 0).then(UpBy1),
  Otherwise(UpBy2)
]);

registerStrategySet(item => item.name === "Backstage passes to a TAFKAL80ETC concert", [
  When(sellIn => sellIn >= 10).then(UpBy1),
  When(sellIn => sellIn >= 5).then(UpBy2),
  When(sellIn => sellIn >= 0).then(UpBy3),
  Otherwise(Nullify)
])

registerStrategySet(item => item.name === "Sulfuras, Hand of Ragnaros", [
  Allways(Noop)
]);

registerStrategySet(item => item.name === "Conjured Mana Cake", [
  When(sellIn => sellIn >= 0).then(DownBy2),
  Otherwise(DownBy4)
]);

registerStrategySet(() => true, [
  When(sellIn => sellIn >= 0).then(DownBy1),
  Otherwise(DownBy2)
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
