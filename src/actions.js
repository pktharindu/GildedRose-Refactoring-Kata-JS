const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const Actions = (qualityChange, sellInChange = -1, min = 0, max = 50) => (item) => {
    item.sellIn += sellInChange;
    item.quality = clamp(item.quality + qualityChange, min, max);
}

const DropToZero = Actions(-Infinity);
const NoNothing = Actions(0, 0, -Infinity, Infinity);
const UpdateQuality = (by) => Actions(by);

module.exports = {DropToZero, NoNothing, UpdateQuality}
