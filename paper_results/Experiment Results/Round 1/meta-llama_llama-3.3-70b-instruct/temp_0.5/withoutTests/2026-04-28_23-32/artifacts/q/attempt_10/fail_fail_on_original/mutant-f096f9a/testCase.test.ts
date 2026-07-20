describe('Q.any', () => {
    it('should throw an error when Q.any is an empty function', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q');
        Q.any = function() {};
        expect(() => Q.any()).toThrowError();
    });
});