describe('Q', () => {
    it('should throw an error when calling Q[""] on the mutated code', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const originalCatch = Q.catch;
        Q.catch = undefined;
        expect(() => Q['catch']()).toThrowError();
        Q.catch = originalCatch;
    });
});