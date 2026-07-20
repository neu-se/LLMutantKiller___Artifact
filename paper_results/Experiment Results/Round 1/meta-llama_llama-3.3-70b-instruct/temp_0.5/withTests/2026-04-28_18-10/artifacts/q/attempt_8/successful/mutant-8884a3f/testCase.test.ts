import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function', () => {
    it('should have longStackSupport enabled when Q.longStackSupport is true', () => {
        q.longStackSupport = true;
        const deferred = q.defer();
        const promise = deferred.promise;
        deferred.reject(new Error('Test error'));
        expect(promise.stack).toBeDefined();
    });
});