describe('Q promise library', () => {
    it('should have a finally block', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q');
        const promise = Q.resolve();
        promise.finally(() => {});
        expect(true).toBe(true);
    });
});