describe('Q', () => {
    it('should not throw an error when requiring the module', () => {
        expect(() => {
            require('../../../../../../../../../subject_repositories/q/q.js');
        }).not.toThrowError();
    });
});