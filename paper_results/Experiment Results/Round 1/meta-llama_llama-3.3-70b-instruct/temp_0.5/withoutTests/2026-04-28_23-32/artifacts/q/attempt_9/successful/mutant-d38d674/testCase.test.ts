import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.makePromise', () => {
    it('should call the fallback function when fallback is not undefined and descriptor does not have the operation', () => {
        const descriptor = {};
        const fallback = jest.fn(() => 'fallback result');
        const promise = Q.makePromise(descriptor, fallback);
        promise.promiseDispatch(null, 'test', []);
        expect(fallback).toHaveBeenCalledTimes(1);
    });
});