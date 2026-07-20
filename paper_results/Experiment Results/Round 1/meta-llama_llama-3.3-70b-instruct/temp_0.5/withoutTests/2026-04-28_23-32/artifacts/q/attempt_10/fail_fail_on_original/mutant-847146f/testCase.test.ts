describe('Q', () => {
    it('should not throw an error when calling Q.catch', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        expect(() => Q.catch()).not.toThrowError();
    });
});