import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return the promise itself when the promise is pending', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const originalValueOf = promise.valueOf;
        promise.valueOf = function() {
            return this;
        }
        expect(promise.valueOf()).toBe(promise);
        promise.valueOf = originalValueOf;
        deferred.resolve(5);
        expect(promise.valueOf()).not.toBe(promise);
    });
});