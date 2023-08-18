const {Shop, Item} = require("../src/gilded_rose");
const fs = require("fs");

describe("Golden master", function() {
  it("should not break golden master", function() {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),

      // This Conjured item does not work properly yet
      //new Item("Conjured Mana Cake", 3, 6),
    ];

    const days = 25;
    const gildedRose = new Shop(items);
    let actual = "";

    for (let day = 0; day < days; day++) {
      actual += `-------- day ${day} --------\n`;
      actual += "name, sellIn, quality\n";
      items.forEach(item => actual += `${item.name}, ${item.sellIn}, ${item.quality}\n`);
      actual += "\n";

      gildedRose.updateQuality();
    }

    const expected = fs.readFileSync('./test/golden_master.txt', 'utf8');
    expect(actual).toBe(expected);
  });
});
