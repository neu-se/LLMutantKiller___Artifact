import { Q } from "../../../../../q.js";

describe('Q promise', () => {
    it('should resolve a promise only once', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        let resolveCount = 0;

        promise.then(() => {
            resolveCount++;
        });

        deferred.resolve();
        deferred.resolve();

        expect(resolveCount).toBe(1);
    });
});