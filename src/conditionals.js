const When = (condition) => {
    return {
        condition,
        then: arg => {
            if (Array.isArray(arg)) {
                return {
                    condition,
                    children: arg
                };
            } else {
                return {
                    condition,
                    action: arg
                };
            }
        }
    };
};

const Fallback = (action) => {
    return {
        condition: () => true,
        action
    };
};

module.exports = {When, Fallback};
