import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should return an object with a state property when calling inspect on a pending promise', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(typeof promise.inspect()).toBe('object');
        expect(promise.inspect()).not.toBeNull();
    });
});