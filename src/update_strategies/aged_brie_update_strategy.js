const BaseUpdateStrategy = require('./base_update_strategy');

class AgedBrieUpdateStrategy extends BaseUpdateStrategy {
    update(item) {
        item.sellIn -= 1;
        item.quality += 1;

        if (item.sellIn <= 0) {
            item.quality += 1;
        }

        if (item.quality > this.maxQuality) {
            item.quality = this.maxQuality;
        }
    }
}

module.exports = AgedBrieUpdateStrategy;
