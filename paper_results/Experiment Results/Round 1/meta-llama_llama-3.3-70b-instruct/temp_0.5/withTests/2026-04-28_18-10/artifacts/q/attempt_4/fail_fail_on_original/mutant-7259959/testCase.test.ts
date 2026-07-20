import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should test the behavior of the mutated file', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.resolve();
        expect(promise.isFulfilled()).toBe(true);
    });
});