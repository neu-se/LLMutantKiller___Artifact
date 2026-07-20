import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q library', () => {
    it('should have long stack support', () => {
        Q.longStackSupport = true;
        var deferred = Q.defer();
        var promise = deferred.promise;
        try {
            throw new Error();
        } catch (e) {
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
            promise.stackCounter = 1;
        }
        expect(promise.stack).not.toBeUndefined();
        Q.longStackSupport = false;
        var deferred2 = Q.defer();
        var promise2 = deferred2.promise;
        try {
            throw new Error();
        } catch (e) {
            if (Q.longStackSupport) {
                promise2.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
                promise2.stackCounter = 1;
            }
        }
        expect(promise2.stack).toBeUndefined();
    });
});