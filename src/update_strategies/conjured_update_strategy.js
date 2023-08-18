const DefaultUpdateStrategy = require('./default_update_strategy');

class ConjuredUpdateStrategy extends DefaultUpdateStrategy {
    update(item) {
        item.quality -= 2;

        if (item.sellIn <= 0) {
            item.quality -= 2;
        }

        if (item.quality < this.minQuality) {
            item.quality = this.minQuality;
        }

        item.sellIn -= 1;
    }
}

module.exports = ConjuredUpdateStrategy;
