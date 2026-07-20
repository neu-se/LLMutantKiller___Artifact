describe('Q', () => {
    it('should throw an error when Q.noConflict is called', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        expect(() => Q.noConflict()).toThrowError("Q.noConflict only works when Q is used as a global");
    });
});