import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.makePromise', () => {
    it('should not call the fallback function when fallback is undefined and descriptor has the operation', () => {
        const descriptor = {
            test: function () {
                return 'test result';
            }
        };
        const promise = Q.makePromise(descriptor, undefined);
        const result = promise.promiseDispatch(null, 'test', []);
        expect(result).toBe('test result');
    });
});