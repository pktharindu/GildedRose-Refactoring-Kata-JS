const clamp = (value, min, max) => Math.max(min, Math.min(max, value))

const Actions = (qualityChange, sellInChange = -1, min = 0, max = 50) => (item) => {
	item.sellIn += sellInChange;
	item.quality = clamp(item.quality + qualityChange, min, max);
}

const UpBy1 = Actions(1);
const UpBy2 = Actions(2);
const UpBy3 = Actions(3);
const Nullify = Actions(-Infinity);
const Noop = Actions(0, 0, -Infinity, Infinity);
const DownBy1 = Actions(-1);
const DownBy2 = Actions(-2);
const DownBy4 = Actions(-4);

module.exports = { UpBy1, UpBy2, UpBy3, Nullify, Noop, DownBy1, DownBy2, DownBy4 }
