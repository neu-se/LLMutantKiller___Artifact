import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q library', () => {
    it('should have long stack support', () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        Q.longStackSupport = true;
        try {
            throw new Error();
        } catch (e) {
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
            promise.stackCounter = 1;
        }
        expect(promise.stack).not.toBeUndefined();
    });
});