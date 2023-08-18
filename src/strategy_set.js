const strategySets = [];

const registerStrategySet = (condition, strategySet) => {
	strategySets.push({
		condition,
		strategySet
	});
}

const getStrategySet = (item) => strategySets.find(strategySet => strategySet.condition(item)).strategySet

const ececuteStrategy = (item) => getStrategySet(item).find(strategy => strategy.condition(item)).action(item);

module.exports = { registerStrategySet, ececuteStrategy }
