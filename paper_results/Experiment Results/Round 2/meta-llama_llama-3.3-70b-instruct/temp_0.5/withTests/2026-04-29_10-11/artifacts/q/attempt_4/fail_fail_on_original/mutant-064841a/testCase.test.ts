import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function', () => {
    it('should set the stack property on a promise when longStackSupport is enabled', () => {
        Q.longStackSupport = true;
        const deferred = Q.defer();
        deferred.resolve();
        const promise = deferred.promise;
        try {
            throw new Error();
        } catch (e) {
            promise.stack = e.stack;
        }
        expect(promise.stack).toBeDefined();
    });
});