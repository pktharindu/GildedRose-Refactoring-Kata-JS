const { UpBy1, UpBy2, UpBy3, Nullify, Noop, DownBy1, DownBy2, DownBy4 } = require('../src/actions');

const Item = () => ({
    sellIn: 10,
    quality: 10
})

describe('Actions', function () {
    it('increase quality by 1', function () {
        const item = Item();

        UpBy1(item);
        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(11);
    });

    it('increase quality by 2', function () {
        const item = Item();

        UpBy2(item);
        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(12);
    });

    it('increase quality by 3', function () {
        const item = Item();

        UpBy3(item);
        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(13);
    });

    it('nullify quality', function () {
        const item = Item();

        Nullify(item);
        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(0);
    });

    it('ignoring', function () {
        const item = Item();

        Noop(item);
        expect(item.sellIn).toBe(10);
        expect(item.quality).toBe(10);
    });

    it('decrease quality by 1', function () {
        const item = Item();

        DownBy1(item);
        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(9);
    });

    it('decrease quality by 2', function () {
        const item = Item();

        DownBy2(item);
        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(8);
    });

    it('decrease quality by 4', function () {
        const item = Item();

        DownBy4(item);
        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(6);
    });

    it('hamdles clamping up', function () {
        const item = {
            sellIn: 10,
            quality: 49
        };

        UpBy3(item);
        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(50);
    });

    it('handles clamping down', function () {
        const item = {
            sellIn: 10,
            quality: 1
        };

        DownBy4(item);
        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(0);
    });

    it('not clamping on ignored', function () {
        const item = {
            sellIn: 10,
            quality: 666
        };

        Noop(item);
        expect(item.sellIn).toBe(10);
        expect(item.quality).toBe(666);
    })
});
