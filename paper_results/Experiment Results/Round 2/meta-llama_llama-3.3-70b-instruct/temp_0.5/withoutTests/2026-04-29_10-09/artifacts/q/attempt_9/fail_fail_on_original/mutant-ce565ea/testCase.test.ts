import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return the promise itself when the promise is pending or rejected', () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.valueOf()).toBe(promise);
        deferred.reject();
        expect(promise.valueOf()).toBe(promise);
        deferred = Q.defer();
        promise.reject();
        expect(promise.valueOf()).toBe(promise);
    });
});