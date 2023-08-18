const {When, Otherwise, Always} = require('../src/conditionals');

describe('Strategy', function () {
    it('builts node', function () {
        const strategy = When('aaa').then([1,2,3]);
        expect(strategy.condition).toBe('aaa');
        expect(strategy.action).toBe(undefined);
        expect(strategy.children).toStrictEqual([1,2,3]);
    });

    it('builts leaf', function () {
        const strategy = When('aaa').then('bbb');
        expect(strategy.condition).toBe('aaa');
        expect(strategy.action).toBe('bbb');
        expect(strategy.children).toBe(undefined);
    });

    it('builds catch all strategy', function () {
        const strategy = Always('bbb');
        expect(strategy.condition()).toBe(true);
        expect(strategy.action).toBe('bbb');
        expect(strategy.children).toBe(undefined);
    });
});
