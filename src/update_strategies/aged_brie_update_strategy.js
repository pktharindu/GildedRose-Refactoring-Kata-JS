const DefaultUpdateStrategy = require('./default_update_strategy');

class AgedBrieUpdateStrategy extends DefaultUpdateStrategy {
    update(item) {
        item.quality = Math.min(this.maxQuality, item.sellIn <= 0 ? item.quality + 2 : item.quality + 1);
        item.sellIn -= 1;
    }
}

module.exports = AgedBrieUpdateStrategy;
