const {When, Fallback} = require('./conditionals');
const {DropToZero, DoNothing, UpdateQuality} = require('./actions');

const findStrategy = (strategySet, item) => {
    const found = strategySet.find(strategy => strategy.condition(item));
    return found.children ? findStrategy(found.children, item) : found;
};

const StrategySet = strategySet => ({
    handle: item => findStrategy(strategySet, item).action(item)
});

const strategyFactory = StrategySet([
    When(item => item.name === "Aged Brie").then([
        When(item => item.sellIn > 0).then(UpdateQuality(1)),
        Fallback(UpdateQuality(2))
    ]),

    When(item => item.name === "Backstage passes to a TAFKAL80ETC concert").then([
        When(item => item.sellIn > 10).then(UpdateQuality(1)),
        When(item => item.sellIn > 5).then(UpdateQuality(2)),
        When(item => item.sellIn > 0).then(UpdateQuality(3)),
        Fallback(DropToZero)
    ]),

    When(item => item.name === "Sulfuras, Hand of Ragnaros").then([
        Fallback(DoNothing)
    ]),

    When(item => item.name === "Conjured Mana Cake").then([
        When(item => item.sellIn > 0).then(UpdateQuality(-2)),
        Fallback(UpdateQuality(-4))
    ]),

    When(() => true).then([
        When(item => item.sellIn > 0).then(UpdateQuality(-1)),
        Fallback(UpdateQuality(-2))
    ])
]);

module.exports = {strategyFactory, StrategySet};
