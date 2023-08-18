const {StrategySet} = require('../src/strategy_factory');
const {When, Otherwise} = require('../src/conditionals');

describe('Strategy factory', function () {
    it('handles right strategy from a set', function () {
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
        strategies.handle({x: 2, y: 1});
        expect(action11).not.toHaveBeenCalled();
        expect(action12).not.toHaveBeenCalled();
        expect(action1d).not.toHaveBeenCalled();
        expect(action21).toHaveBeenCalledWith({x: 2, y: 1});
        expect(action2d).not.toHaveBeenCalled();
        expect(fallback).not.toHaveBeenCalled();

        jest.clearAllMocks();
        strategies.handle({x: 1, y: 2});
        expect(action11).not.toHaveBeenCalled();
        expect(action12).toHaveBeenCalledWith({x: 1, y: 2});
        expect(action1d).not.toHaveBeenCalled();
        expect(action21).not.toHaveBeenCalled();
        expect(action2d).not.toHaveBeenCalled();
        expect(fallback).not.toHaveBeenCalled();

        jest.clearAllMocks();
        strategies.handle({x: 2, y: 100});
        expect(action11).not.toHaveBeenCalled();
        expect(action12).not.toHaveBeenCalled();
        expect(action1d).not.toHaveBeenCalled();
        expect(action21).not.toHaveBeenCalled();
        expect(action2d).toHaveBeenCalledWith({x: 2, y: 100});
        expect(fallback).not.toHaveBeenCalled();

        jest.clearAllMocks();
        strategies.handle({x: 200, y: 100});
        expect(action11).not.toHaveBeenCalled();
        expect(action12).not.toHaveBeenCalled();
        expect(action1d).not.toHaveBeenCalled();
        expect(action21).not.toHaveBeenCalled();
        expect(action2d).not.toHaveBeenCalled();
        expect(fallback).toHaveBeenCalledWith({x: 200, y: 100});
    });
});
