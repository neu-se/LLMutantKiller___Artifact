import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.makePromise', () => {
    it('should call the fallback function when the descriptor does not have the operation and fallback is not undefined', () => {
        const descriptor = {};
        const fallback = jest.fn(() => Promise.resolve('fallback result'));
        const promise = Q.makePromise(descriptor, fallback);
        const result = promise.promiseDispatch(null, 'test', []);
        expect(fallback).toHaveBeenCalledTimes(1);
        expect(result).resolves.toBe('fallback result');
    });
});