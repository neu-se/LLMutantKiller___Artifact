import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should not resolve a promise twice', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        let resolveCount = 0;

        promise.then(() => {
            resolveCount++;
        });

        deferred.resolve();
        deferred.resolve();

        // The mutation will cause this test to fail
        // because done will be true in the mutated code
        expect(resolveCount).toBe(1);
    });
});