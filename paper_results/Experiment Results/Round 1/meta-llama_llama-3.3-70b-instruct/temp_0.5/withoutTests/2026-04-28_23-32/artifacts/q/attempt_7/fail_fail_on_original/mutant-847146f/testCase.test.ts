describe('Q', () => {
    it('should have a catch method that is a function', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const promise = Q.reject('test');
        expect(typeof promise.catch).toBe('function');
    });
});