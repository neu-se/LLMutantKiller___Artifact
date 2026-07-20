import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.makePromise', () => {
    it('should call the fallback function when the descriptor does not have the operation and fallback is undefined', () => {
        const descriptor = {};
        const fallback = undefined;
        const promise = Q.makePromise(descriptor, fallback);
        const result = promise.promiseDispatch(null, 'test', []);
        expect(result).toBeUndefined();
    });
});