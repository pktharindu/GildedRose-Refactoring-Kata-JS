const {getStrategySet, resetStrategySets, registerStrategySet, executeStrategy} = require('../src/strategy_factory');
const {When, Otherwise} = require('../src/conditionals');

describe('Strategy factory', function () {
    beforeEach(() => {
        resetStrategySets();
    });

    it('finds right strategy set', function () {
        registerStrategySet(x => x === 1, 'strategies-1');
        registerStrategySet(() => true, 'strategies-2');

        getStrategySet(1);

        expect(getStrategySet(1)).toBe('strategies-1');
        expect(getStrategySet(666)).toBe('strategies-2');
    });

    it('finds and executes strategy', function () {

        const action1 = jest.fn();
        const action2 = jest.fn();
        const action3 = jest.fn();

        const strategies = [
            When(x => x === 1).then(action1),
            When(x => x === 2).then(action2),
            Otherwise(action3),
        ];

        registerStrategySet(() => true, strategies);
        executeStrategy(2);

        expect(action1).not.toHaveBeenCalled();
        expect(action2).toHaveBeenCalledWith(2);
        expect(action3).not.toHaveBeenCalled();
    });

    it('finds and executes default strategy', function () {

        const action1 = jest.fn();
        const action2 = jest.fn();
        const action3 = jest.fn();

        const strategies = [
            When(x => x === 1).then(action1),
            When(x => x === 2).then(action2),
            Otherwise(action3),
        ];

        registerStrategySet(() => true, strategies);
        executeStrategy(666);

        expect(action1).not.toHaveBeenCalled();
        expect(action2).not.toHaveBeenCalled();
        expect(action3).toHaveBeenCalledWith(666);
    });
});
