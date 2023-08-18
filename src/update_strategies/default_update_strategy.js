class DefaultUpdateStrategy {
    constructor() {
        this.minQuality = 0;
        this.maxQuality = 50;
    }
    update(item) {
        item.quality = Math.max(this.minQuality, item.sellIn <= 0 ? item.quality - 2 : item.quality - 1);
        item.sellIn -= 1;
    }
}

module.exports = DefaultUpdateStrategy;
