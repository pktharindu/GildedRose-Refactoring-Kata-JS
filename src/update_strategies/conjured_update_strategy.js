const DefaultUpdateStrategy = require('./default_update_strategy');

class ConjuredUpdateStrategy extends DefaultUpdateStrategy {
    update(item) {
        item.quality = Math.max(this.minQuality, item.sellIn <= 0 ? item.quality - 4 : item.quality - 2);
        item.sellIn -= 1;
    }
}

module.exports = ConjuredUpdateStrategy;
