import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q library', () => {
    it('should have long stack support', () => {
        Q.longStackSupport = true;
        var error = new Error();
        expect(typeof error.stack).toBe('string');
        Q.longStackSupport = false;
        var deferred = Q.defer();
        var promise = deferred.promise;
        try {
            throw error;
        } catch (e) {
            if (Q.longStackSupport) {
                promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
                promise.stackCounter = 1;
            }
        }
        expect(promise.stack).toBeUndefined();
    });
});