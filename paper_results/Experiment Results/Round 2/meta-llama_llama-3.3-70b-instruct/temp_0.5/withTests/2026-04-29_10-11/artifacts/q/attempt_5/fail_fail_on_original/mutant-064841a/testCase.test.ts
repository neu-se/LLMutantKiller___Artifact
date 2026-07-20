import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q function', () => {
    it('should set the stack property on a promise when longStackSupport is enabled', () => {
        Q.longStackSupport = true;
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.resolve();
        try {
            throw new Error();
        } catch (e) {
            const stack = e.stack;
            // The original code should include the stack trace in the promise
            // The mutated code should not include the stack trace
            expect(promise.stack).toContain(stack);
        }
    });
});