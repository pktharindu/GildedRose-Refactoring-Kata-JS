const DefaultUpdateStrategy = require('./default_update_strategy');
const AgedBrieUpdateStrategy = require('./aged_brie_update_strategy');
const NullUpdateStrategy = require('./null_update_strategy');
const BackstagePassUpdateStrategy = require('./backstage_pass_update_strategy');
const ConjuredUpdateStrategy = require('./conjured_update_strategy');

module.exports = {
    DefaultUpdateStrategy,
    AgedBrieUpdateStrategy,
    NullUpdateStrategy,
    BackstagePassUpdateStrategy,
    ConjuredUpdateStrategy,
};
