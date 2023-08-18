class BaseUpdateStrategy {
    constructor() {
        this.minQuality = 0;
        this.maxQuality = 50;
    }
    update(item) {
        item.sellIn -= 1;
        item.quality -= 1;

        if (item.sellIn <= 0) {
            item.quality -= 1;
        }

        if (item.quality < this.minQuality) {
            item.quality = this.minQuality;
        }
    }
}

module.exports = BaseUpdateStrategy;
