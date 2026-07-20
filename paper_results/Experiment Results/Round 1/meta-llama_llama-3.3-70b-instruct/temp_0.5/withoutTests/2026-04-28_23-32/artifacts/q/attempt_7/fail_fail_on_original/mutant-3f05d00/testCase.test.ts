describe('Q promise library', () => {
    it('should have a finally method that is a function', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q');
        const promise = Q.resolve();
        const methods = Object.getOwnPropertyNames(promise);
        const finallyMethod = methods.find(method => method === 'finally');
        expect(finallyMethod).toBeDefined();
        expect(typeof promise[finallyMethod]).toBe('function');
    });
});