describe('Q', () => {
    it('should throw an error when trying to access a method with an empty string', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q');
        const obj = Q({});
        expect(() => obj[""]).toThrowError();
    });
});