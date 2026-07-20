import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise and track its stack when Q.longStackSupport is true', () => {
        Q.longStackSupport = true;
        const deferred = Q.defer();
        const promise = deferred.promise;
        const error = new Error();
        deferred.reject(error);
        expect(promise.stack).toBeDefined();
    });
});