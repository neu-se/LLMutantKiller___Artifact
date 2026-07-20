describe('Q promise library', () => {
    it('should throw an error when trying to access a property with an empty string', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q');
        const promise = Q.resolve();
        expect(() => promise[""]).toThrowError();
    });
});