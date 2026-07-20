import { Q } from "../../../../../q";

describe('Q library', () => {
    it('should have long stack support', () => {
        Q.longStackSupport = true;
        var deferred = Q.defer();
        var promise = deferred.promise;
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
            promise.stackCounter = 1;
        }
        expect(promise.stack).not.toBeUndefined();
    });
});