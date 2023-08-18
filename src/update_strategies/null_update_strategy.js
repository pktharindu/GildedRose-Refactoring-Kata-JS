const DefaultUpdateStrategy = require('./default_update_strategy');

class NullUpdateStrategy extends DefaultUpdateStrategy {
    update(item) {
        // does nothing
    }
}

module.exports = NullUpdateStrategy;
