const {Shop, Item} = require("../src/gilded_rose");
const {Updater, StrategyNode, findStrategyNide} = require("../src/gilded_rose");

describe("Updater", function() {
  it("changes quality", function() {
    const updater1 = Updater(1);
    const updater2 = Updater(2);

    const item = new Item('foo', 8, 10);

    updater1(item);
    updater2(item);

    expect(item.quality).toEqual(10+1+2);
  });

  it("changes sellIn", function() {
    //
  });

  it("clamps quality", function() {
    //
  });
})

describe("StrategyNode", function() {
  it("should find strategy by condition", function() {
    const strategies = [
      StrategyNode(data => data > 10, 'first'),
      StrategyNode(data => data > 5, 'second'),
      StrategyNode(() => true, 'third'),
    ]

    expect(findStrategyNode(15, strategies)).toEqual('first');
    expect(findStrategyNode(8, strategies)).toEqual('second');
    expect(findStrategyNode(-15, strategies)).toEqual('third');
  });
});


describe("Gilded Rose", function() {
  /*
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("fixme");
  });
  */
});
