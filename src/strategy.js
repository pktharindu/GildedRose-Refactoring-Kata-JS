const When = (condition) => {
    return {
        condition,
        action: () => {
        },
        then: action => ({condition, action})
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
