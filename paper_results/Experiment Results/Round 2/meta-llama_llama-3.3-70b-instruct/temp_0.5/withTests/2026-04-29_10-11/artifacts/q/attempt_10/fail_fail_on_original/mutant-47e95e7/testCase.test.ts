import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should handle valueOf correctly', () => {
        const promise = Q(10);
        expect(promise.valueOf()).toBe(10);
        const deferred = Q.defer();
        const pendingPromise = deferred.promise;
        expect(pendingPromise.valueOf()).toBe(pendingPromise);
        deferred.resolve(20);
        expect(pendingPromise.valueOf()).toBe(20);
    });
});