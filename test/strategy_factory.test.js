const {getStrategySet, resetStrategySets, registerStrategySet, applyStrategy} = require('../src/strategy_factory');
const {When, Otherwise} = require('../src/conditionals');

describe('Strategy factory', function () {
    beforeEach(() => {
        resetStrategySets();
    });

    it('finds right strategy set', function () {
        registerStrategySet(x => x === 1, 'strategyFactory-1');
        registerStrategySet(() => true, 'strategyFactory-2');

        getStrategySet(1);

        expect(getStrategySet(1)).toBe('strategyFactory-1');
        expect(getStrategySet(666)).toBe('strategyFactory-2');
    });

    it('finds and executes strategy', function () {

        const action1 = jest.fn();
        const action2 = jest.fn();
        const action3 = jest.fn();

        const strategyFactory = [
            When(x => x === 1).then(action1),
            When(x => x === 2).then(action2),
            Otherwise(action3),
        ];

        registerStrategySet(() => true, strategyFactory);
        applyStrategy(2);

        expect(action1).not.toHaveBeenCalled();
        expect(action2).toHaveBeenCalledWith(2);
        expect(action3).not.toHaveBeenCalled();
    });

    it('finds and executes default strategy', function () {

        const action1 = jest.fn();
        const action2 = jest.fn();
        const action3 = jest.fn();

        const strategyFactory = [
            When(x => x === 1).then(action1),
            When(x => x === 2).then(action2),
            Otherwise(action3),
        ];

        registerStrategySet(() => true, strategyFactory);
        applyStrategy(666);

        expect(action1).not.toHaveBeenCalled();
        expect(action2).not.toHaveBeenCalled();
        expect(action3).toHaveBeenCalledWith(666);
    });
});
