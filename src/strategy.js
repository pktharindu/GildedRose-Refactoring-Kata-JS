const When = (condition) => {
    return {
        condition,
        then: arg => {
            if(Array.isArray(arg)) {
                return {
                    condition,
                    strategySet: arg
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

const Condition = item => strategy => strategy.condition(item)

module.exports = {When, Otherwise, Always, Condition}
