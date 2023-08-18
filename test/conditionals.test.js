const {When, Otherwise, Always} = require('../src/conditionals');

describe('Strategy', function () {
    it('builts strategy', function () {
        const strategy = When('aaa').then('bbb');
        expect(strategy.condition).toBe('aaa');
        expect(strategy.action).toBe('bbb');
    });

    it('builds catch all strategy', function () {
        const strategy = Always('bbb');
        expect(strategy.condition()).toBe(true);
        expect(strategy.action).toBe('bbb');
    });

    it('builds default strategy', function () {
        const strategy = Otherwise('bbb');
        expect(strategy.condition()).toBe(true);
        expect(strategy.action).toBe('bbb');
    });
});
