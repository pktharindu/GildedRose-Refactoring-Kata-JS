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

module.exports = {When, Otherwise, Always}
