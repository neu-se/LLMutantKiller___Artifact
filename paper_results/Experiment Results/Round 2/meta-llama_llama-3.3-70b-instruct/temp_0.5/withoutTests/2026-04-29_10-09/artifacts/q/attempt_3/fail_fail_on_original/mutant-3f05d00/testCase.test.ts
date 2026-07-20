describe('Q', () => {
    it('should have a "finally" method on the Promise prototype', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const promise = Q.resolve();
        expect(Object.getOwnPropertyNames(promise).includes('finally')).toBe(true);
    });
});