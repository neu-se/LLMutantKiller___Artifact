import { Q } from "../../../../../../../../subject_repositories/q/q.js"

describe('q', () => {
    it('should test the behavior of the mutated file', () => {
        expect.hasAssertions();
        const deferred = Q.defer();
        Q.nextTick(() => {
            deferred.resolve();
        });
        const promise = deferred.promise;
        expect(promise.isPending()).toBe(true);
        return promise.then(() => {
            expect(promise.isPending()).toBe(false);
            expect(promise.isFulfilled()).toBe(true);
        });
    });
});