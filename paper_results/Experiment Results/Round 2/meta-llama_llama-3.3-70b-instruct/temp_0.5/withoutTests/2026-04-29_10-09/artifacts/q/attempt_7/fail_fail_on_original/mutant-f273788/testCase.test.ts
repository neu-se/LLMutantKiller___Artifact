const Q = require('../../../../../../../../../subject_repositories/q/q');

describe('Q', () => {
    it('should apply a function with arguments', () => {
        const object = jest.fn((arg1: number, arg2: number) => {
            return arg1 + arg2;
        });

        const promise = Q(object);
        const result = promise.fapply([1, 2]);

        return result.then((value: number) => {
            expect(value).toBe(3);
            expect(object).toHaveBeenCalledTimes(1);
            expect(object).toHaveBeenCalledWith(1, 2);
        });
    });

    it('should not apply a function when fapply is called with no arguments in the mutated code', () => {
        const object = jest.fn((arg1: number, arg2: number) => {
            return arg1 + arg2;
        });

        const promise = Q(object);
        const result = promise.fapply([]);

        return result.then((value: number) => {
            expect(object).not.toHaveBeenCalled();
        });
    });
});