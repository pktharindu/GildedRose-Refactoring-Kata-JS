const Actions = (qualityChange, sellInChange = -1, min = 0, max = 50) => (item) => {
    item.sellIn += sellInChange;
    item.quality = Math.max(min, Math.min(max, item.quality + qualityChange));
};

const DropToZero = Actions(-Infinity);
const DoNothing = Actions(0, 0, -Infinity, Infinity);
const UpdateQuality = (by) => Actions(by);

module.exports = {DropToZero, DoNothing, UpdateQuality};
