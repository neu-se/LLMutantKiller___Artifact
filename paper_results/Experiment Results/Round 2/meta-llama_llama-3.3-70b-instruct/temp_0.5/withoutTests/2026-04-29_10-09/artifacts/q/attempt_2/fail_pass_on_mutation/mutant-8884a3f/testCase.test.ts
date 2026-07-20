import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise and track its stack when Q.longStackSupport is true', () => {
        Q.longStackSupport = true;
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.reject(new Error());
        expect(promise.isRejected()).toBe(true);
        Q.longStackSupport = false;
        const deferred2 = Q.defer();
        const promise2 = deferred2.promise;
        deferred2.reject(new Error());
        expect(promise2.isRejected()).toBe(true);
    });
});