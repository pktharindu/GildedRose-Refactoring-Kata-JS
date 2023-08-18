const {Item} = require('../src/gilded_rose');
const {DropToZero, DoNothing, UpdateQuality} = require('../src/actions');

describe('Actions', function () {
    it('can drop quality to zero', function () {
        const item = new Item('test', 10, 10);

        DropToZero(item);
        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(0);
    });

    it('can do nothing', function () {
        const item = new Item('test', 10, 666);

        DoNothing(item);
        expect(item.sellIn).toBe(10);
        expect(item.quality).toBe(666);
    });

    it('can update quality', function () {
        const item = new Item('test', 10, 10);

        UpdateQuality(1)(item);

        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(11);

        UpdateQuality(-2)(item);

        expect(item.sellIn).toBe(8);
        expect(item.quality).toBe(9);
    });
});
