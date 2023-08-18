const {When, Always, Otherwise, StrategySet} = require('../src/strategy');

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

    it('executes right strategy from a set', function () {
        const action11 = jest.fn();
        const action12 = jest.fn();
        const action1d = jest.fn();
        const action21 = jest.fn();
        const action2d = jest.fn();
        const fallback = jest.fn();

        const strategies = StrategySet([
            When(x => x.x === 1).then([
                When(x => x.y === 1).then(action11),
                When(x => x.y === 2).then(action12),
                Otherwise(action1d)
            ]),
            When(x => x.x === 2).then([
                When(x => x.y === 1).then(action21),
                Otherwise(action2d)
            ]),
            Otherwise(fallback)
        ]);

        jest.clearAllMocks();
        strategies.execute({x: 2, y: 1});
        expect(action11).not.toHaveBeenCalled();
        expect(action12).not.toHaveBeenCalled();
        expect(action1d).not.toHaveBeenCalled();
        expect(action21).toHaveBeenCalledWith({x: 2, y: 1});
        expect(action2d).not.toHaveBeenCalled();
        expect(fallback).not.toHaveBeenCalled();

        jest.clearAllMocks();
        strategies.execute({x: 1, y: 2});
        expect(action11).not.toHaveBeenCalled();
        expect(action12).toHaveBeenCalledWith({x: 1, y: 2});
        expect(action1d).not.toHaveBeenCalled();
        expect(action21).not.toHaveBeenCalled();
        expect(action2d).not.toHaveBeenCalled();
        expect(fallback).not.toHaveBeenCalled();

        jest.clearAllMocks();
        strategies.execute({x: 2, y: 100});
        expect(action11).not.toHaveBeenCalled();
        expect(action12).not.toHaveBeenCalled();
        expect(action1d).not.toHaveBeenCalled();
        expect(action21).not.toHaveBeenCalled();
        expect(action2d).toHaveBeenCalledWith({x: 2, y: 100});
        expect(fallback).not.toHaveBeenCalled();

        jest.clearAllMocks();
        strategies.execute({x: 200, y: 100});
        expect(action11).not.toHaveBeenCalled();
        expect(action12).not.toHaveBeenCalled();
        expect(action1d).not.toHaveBeenCalled();
        expect(action21).not.toHaveBeenCalled();
        expect(action2d).not.toHaveBeenCalled();
        expect(fallback).toHaveBeenCalledWith({x: 200, y: 100});
    });
});
