import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should correctly filter internal frames from stack traces', () => {
        const error = new Error();
        error.stack = 'Error\n    at isInternalFrame (q.js:123)\n    at externalFunction (external.js:456)';
        const deferred = q.defer();
        const promise = deferred.promise;
        promise.stack = error.stack;
        const originalLines = error.stack.split('\n').length;
        q.nextTick(() => {
            deferred.resolve();
        });
        q.nextTick(() => {
            const newLines = promise.stack.split('\n').length;
            expect(newLines).toBeLessThan(originalLines + 1);
        });
    });
});