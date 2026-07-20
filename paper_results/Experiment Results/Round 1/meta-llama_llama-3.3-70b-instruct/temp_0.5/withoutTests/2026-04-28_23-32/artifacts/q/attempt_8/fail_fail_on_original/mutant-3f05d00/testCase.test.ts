describe('Q promise library', () => {
    it('should have a finally method that is a function', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q');
        const promise = Q.resolve();
        expect(promise.finally).toBeDefined();
        expect(typeof promise.finally).toBe('function');
    });
});