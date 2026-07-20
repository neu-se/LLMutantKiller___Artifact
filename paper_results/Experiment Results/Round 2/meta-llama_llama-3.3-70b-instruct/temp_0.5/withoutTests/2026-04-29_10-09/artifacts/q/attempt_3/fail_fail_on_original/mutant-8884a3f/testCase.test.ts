import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should create a promise with a stack trace when Q.longStackSupport is true', () => {
        Q.longStackSupport = true;
        const deferred = Q.defer();
        const promise = deferred.promise;
        const error = new Error();
        deferred.reject(error);
        expect(error.stack).toContain("q.js");
    });
});