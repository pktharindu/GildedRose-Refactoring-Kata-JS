const { When, Otherwise, Always } = require('./strategy');
const { UpBy1, UpBy2, UpBy3, Nullify, Noop, DownBy1, DownBy2, DownBy4 } = require('./actions');

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const strategySets = [];

const registerStrategySet = (condition, strategySet) => {
  strategySets.push({
    condition,
    strategySet
  });
}

const getStrategySet = (item) => strategySets.find(strategySet => strategySet.condition(item)).strategySet

registerStrategySet(item => item.name === "Aged Brie", [
  When(item => item.sellIn > 0).then(UpBy1),
  Otherwise(UpBy2)
]);

registerStrategySet(item => item.name === "Backstage passes to a TAFKAL80ETC concert", [
  When(item => item.sellIn > 10).then(UpBy1),
  When(item => item.sellIn > 5).then(UpBy2),
  When(item => item.sellIn > 0).then(UpBy3),
  Otherwise(Nullify)
])

registerStrategySet(item => item.name === "Sulfuras, Hand of Ragnaros", [
  Always(Noop)
]);

registerStrategySet(item => item.name === "Conjured Mana Cake", [
  When(item => item.sellIn > 0).then(DownBy2),
  Otherwise(DownBy4)
]);

registerStrategySet(() => true, [
  When(item => item.sellIn > 0).then(DownBy1),
  Otherwise(DownBy2)
]);

const updateItem = (item) => getStrategySet(item).find(strategy => strategy.condition(item)).action(item);

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
