const BaseUpdateStrategy = require('./base_update_strategy');

class AgedBrieUpdateStrategy extends BaseUpdateStrategy {
    update(item) {
        item.quality += 1;

        if (item.sellIn <= 0) {
            item.quality += 1;
        }

        if (item.quality > this.maxQuality) {
            item.quality = this.maxQuality;
        }

        item.sellIn -= 1;
    }
}

module.exports = AgedBrieUpdateStrategy;
