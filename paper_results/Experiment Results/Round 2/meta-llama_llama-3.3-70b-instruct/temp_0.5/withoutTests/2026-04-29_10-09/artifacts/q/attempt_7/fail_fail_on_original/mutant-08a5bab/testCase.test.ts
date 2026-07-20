import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should correctly filter internal frames from stack traces', () => {
        const error = new Error();
        error.stack = 'Error\n    at isInternalFrame (q.js:123)\n    at externalFunction (external.js:456)';
        const makeStackTraceLong = q.makeStackTraceLong;
        const promise = q.defer().promise;
        promise.stack = error.stack;
        makeStackTraceLong(error, promise);
        expect(error.stack).not.toContain('isInternalFrame (q.js:123)');
        expect(error.stack).toContain('externalFunction (external.js:456)');
    });
});