describe('Q', () => {
    it('should throw an error when qFileName is not set', () => {
        const q = require('../../../../../../../../../subject_repositories/q/q.js');
        expect(() => {
            q();
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");
    });
});