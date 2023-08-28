const When = (condition) => ({
    condition,
    then: arg =>
        Array.isArray(arg) ? {
            condition,
            children: arg
        } : {
            condition,
            action: arg
        }
});

const Fallback = (action) => ({
    condition: () => true,
    action
});

module.exports = {When, Fallback};
