const {Shop, Item} = require('../src/gilded_rose');
const fs = require('fs');

describe('Golden master', function () {
    it('should not break golden master', function () {
        const items = [
            new Item('+5 Dexterity Vest', 10, 20),
            new Item('Aged Brie', 2, 0),
            new Item('Elixir of the Mongoose', 5, 7),
            new Item('Sulfuras, Hand of Ragnaros', 0, 80),
            new Item('Sulfuras, Hand of Ragnaros', -1, 80),
            new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49),
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),

            // This Conjured item does not work properly yet
            //new Item("Conjured Mana Cake", 3, 6),
        ];

        const days = 25;
        const gildedRose = new Shop(items);
        let actual = "";

        for (let day = 0; day < days; day++) {
            actual += `-------- day ${day} --------\n`;
            actual += 'name, sellIn, quality\n';
            items.forEach(item => actual += `${item.name}, ${item.sellIn}, ${item.quality}\n`);
            actual += '\n';

            gildedRose.updateQuality();
        }

        const expected = fs.readFileSync('./test/golden_master.txt', 'utf8');
        expect(actual).toBe(expected);
    });
});

describe('Normal', function () {
    it('should decrease sellIn and quality by 1 before sellIn', function () {
        const item = new Item('normal', 10, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(9);
    });

    it('should decrease sellIn and quality by 1 a day before sellIn', function () {
        const item = new Item('normal', 1, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(0);
        expect(item.quality).toBe(9);
    });

    it('should decrease quality by 2 on sellIn', function () {
        const item = new Item('normal', 0, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(-1);
        expect(item.quality).toBe(8);
    });

    it('should decrease quality by 2 past sellIn', function () {
        const item = new Item('normal', -1, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(-2);
        expect(item.quality).toBe(8);
    });

    it('should not decrease quality below 0', function () {
        const items = [
            new Item('normal', 10, 0),
            new Item('normal', 0, 0),
            new Item('normal', -10, 0),
        ];
        const gildedRose = new Shop(items);

        gildedRose.updateQuality();

        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(0);
        expect(items[1].sellIn).toBe(-1);
        expect(items[1].quality).toBe(0);
        expect(items[2].sellIn).toBe(-11);
        expect(items[2].quality).toBe(0);
    });
});

describe('Aged Brie', function () {
    it('should increase quality by 1 before sellIn', function () {
        const item = new Item('Aged Brie', 10, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(11);
    });

    it('should increase quality by 1 a day before sellIn', function () {
        const item = new Item('Aged Brie', 1, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(0);
        expect(item.quality).toBe(11);
    });

    it('should not increase quality before sellIn when quality is at max', () => {
        const item = new Item('Aged Brie', 10, 50);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(50);
    });

    it('should increase quality by 2 on sellIn', function () {
        const item = new Item('Aged Brie', 0, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(-1);
        expect(item.quality).toBe(12);
    });

    it('should not increase quality on sellIn when quality is at max', () => {
        const item = new Item('Aged Brie', 0, 50);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(-1);
        expect(item.quality).toBe(50);
    });

    it('should increase quality by 2 past sellIn', function () {
        const item = new Item('Aged Brie', -1, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(-2);
        expect(item.quality).toBe(12);
    });

    it('should not increase quality past sellIn when quality is at max', () => {
        const item = new Item('Aged Brie', -1, 50);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(-2);
        expect(item.quality).toBe(50);
    });

    it('should not increase quality above 50', function () {
        const items = [
            new Item('Aged Brie', 10, 50),
            new Item('Aged Brie', 0, 49),
            new Item('Aged Brie', 0, 50),
            new Item('Aged Brie', -5, 49),
            new Item('Aged Brie', -5, 50),
        ];
        const gildedRose = new Shop(items);

        gildedRose.updateQuality();

        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(50);
        expect(items[1].sellIn).toBe(-1);
        expect(items[1].quality).toBe(50);
        expect(items[2].sellIn).toBe(-1);
        expect(items[2].quality).toBe(50);
        expect(items[3].sellIn).toBe(-6);
        expect(items[3].quality).toBe(50);
        expect(items[4].sellIn).toBe(-6);
        expect(items[4].quality).toBe(50);
    });
});

describe('Sulfuras', function () {
    it('should not change sellIn or quality before sellIn', function () {
        const item = new Item('Sulfuras, Hand of Ragnaros', 10, 80);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(10);
        expect(item.quality).toBe(80);
    });

    it('should not change sellIn or quality on sellIn', function () {
        const item = new Item('Sulfuras, Hand of Ragnaros', 0, 80);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(0);
        expect(item.quality).toBe(80);
    });

    it('should not change sellIn or quality past sellIn', function () {
        const item = new Item('Sulfuras, Hand of Ragnaros', -5, 80);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(-5);
        expect(item.quality).toBe(80);
    });
});

describe('Backstage pass', function () {
    it('should increase quality by 1 when sellIn is > 10', function () {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(10);
        expect(item.quality).toBe(11);
    });

    it('should increase quality by 2 when sellIn is 10', function () {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(12);
    });

    it('should increase quality by 2 when sellIn is < 10', function () {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 6, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(5);
        expect(item.quality).toBe(12);
    });

    it('should increase quality by 3 when sellIn is 5', function () {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 5, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(4);
        expect(item.quality).toBe(13);
    });

    it('should increase quality by 3 when sellIn is < 5', function () {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 3, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(2);
        expect(item.quality).toBe(13);
    });

    it('should increase quality by 3 a day before sellIn', function () {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 1, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(0);
        expect(item.quality).toBe(13);
    });

    it('should drop quality to 0 on sellIn', function () {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(-1);
        expect(item.quality).toBe(0);
    });

    it('should drop quality to 0 past sellIn', () => {
        const item = new Item('Backstage passes to a TAFKAL80ETC concert', -1, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(-2);
        expect(item.quality).toBe(0);
    });

    it('should not increase quality above 50', function () {
        const items = [
            new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49),
            new Item('Backstage passes to a TAFKAL80ETC concert', 6, 49),
            new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
            new Item('Backstage passes to a TAFKAL80ETC concert', 1, 49),
        ];
        const gildedRose = new Shop(items);

        gildedRose.updateQuality();

        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(50);
        expect(items[1].sellIn).toBe(5);
        expect(items[1].quality).toBe(50);
        expect(items[2].sellIn).toBe(4);
        expect(items[2].quality).toBe(50);
        expect(items[3].sellIn).toBe(0);
        expect(items[3].quality).toBe(50);
    });
});

describe('Conjured', function () {
    it('should decrease quality by 2 before sellIn', function () {
        const item = new Item('Conjured Mana Cake', 10, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(9);
        expect(item.quality).toBe(8);
    });

    it('should decrease quality by 2 a day before sellIn', function () {
        const item = new Item('Conjured Mana Cake', 1, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(0);
        expect(item.quality).toBe(8);
    });

    it('should decrease quality by 4 on sellIn', function () {
        const item = new Item('Conjured Mana Cake', 0, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(-1);
        expect(item.quality).toBe(6);
    });

    it('should decrease quality by 4 past sellIn', function () {
        const item = new Item('Conjured Mana Cake', -1, 10);
        const gildedRose = new Shop([item]);

        gildedRose.updateQuality();

        expect(item.sellIn).toBe(-2);
        expect(item.quality).toBe(6);
    });

    it('should not decrease quality below 0', function () {
        const items = [
            new Item('Conjured Mana Cake', 10, 0),
            new Item('Conjured Mana Cake', 0, 0),
            new Item('Conjured Mana Cake', -10, 0),
        ];
        const gildedRose = new Shop(items);

        gildedRose.updateQuality();

        expect(items[0].sellIn).toBe(9);
        expect(items[0].quality).toBe(0);
        expect(items[1].sellIn).toBe(-1);
        expect(items[1].quality).toBe(0);
        expect(items[2].sellIn).toBe(-11);
        expect(items[2].quality).toBe(0);
    });
});
