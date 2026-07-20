import { Q } from "../../../../../q";

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
    });
});