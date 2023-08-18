const When = (condition) => {
    return {
        condition,
        then: arg => {
            if(Array.isArray(arg)) {
                return {
                    condition,
                    children: arg
                }
            } else {
                return {
                    condition,
                    action: arg
                }
            }
        }
    }
}
const Otherwise = (action) => {
    return {
        condition: () => true,
        action
    }
}

const Always = Otherwise

const findStrategy = (strategySet, item) => {
    const found = strategySet.find(strategy => strategy.condition(item));
    return found.children ? findStrategy(found.children, item) : found;
}

const StrategySet = strategySet => {
    return {
        execute: item => findStrategy(strategySet, item).action(item)
    }
}

module.exports = {When, Otherwise, Always, StrategySet}
