describe('Q', () => {
    it('should throw an error when trying to access an undefined property', () => {
        // Try to access an undefined property
        expect(() => {
            const q = new (require('../../../../../../../../../subject_repositories/q/q.js'))();
            q.qFileName;
        }).toThrowError();
    });
});