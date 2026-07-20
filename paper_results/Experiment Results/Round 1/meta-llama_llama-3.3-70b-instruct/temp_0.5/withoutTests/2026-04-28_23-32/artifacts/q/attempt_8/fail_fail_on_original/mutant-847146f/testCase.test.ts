describe('Q', () => {
    it('should throw an error when calling Q[""]', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        expect(() => Q[""]).toThrowError();
    });
});