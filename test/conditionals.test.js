const {When, Fallback} = require('../src/conditionals');

describe('Conditions', function () {
    it('builds node', function () {
        const strategy = When('aaa').then([1,2,3]);
        expect(strategy.condition).toBe('aaa');
        expect(strategy.action).toBe(undefined);
        expect(strategy.children).toStrictEqual([1,2,3]);
    });

    it('builds leaf', function () {
        const strategy = When('aaa').then('bbb');
        expect(strategy.condition).toBe('aaa');
        expect(strategy.action).toBe('bbb');
        expect(strategy.children).toBe(undefined);
    });

    it('builds fallback', function () {
        const strategy = Fallback('bbb');
        expect(strategy.condition()).toBe(true);
        expect(strategy.action).toBe('bbb');
    });
});
