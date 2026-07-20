import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function', () => {
    it('should set the stack property on a promise when longStackSupport is enabled', () => {
        Q.longStackSupport = true;
        const deferred = Q.defer();
        deferred.reject(new Error());
        const promise = deferred.promise;
        try {
            promise.then(() => {});
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
        expect(promise.stack).toBeDefined();
    });
});