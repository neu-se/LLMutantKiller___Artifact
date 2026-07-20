import Q from '../../../../../../../../../../../subject_repositories/q/q.js';

describe('Q', () => {
    it('should apply a function with arguments and return the correct result', () => {
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

    it.skip('should apply a function with arguments and return undefined when no arguments are passed in the mutated code', () => {
        const object = jest.fn((arg1: number, arg2: number) => {
            return arg1 + arg2;
        });

        const promise = Q(object);
        const result = promise.fapply([]);

        return result.then((value: number) => {
            expect(value).toBeUndefined();
        });
    });
});