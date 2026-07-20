describe('Q', () => {
    it('should throw an error when finally callback is not a function', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q').Q;
        expect(() => {
            Q().finally("string");
        }).toThrowError("Q can't apply finally callback");
    });
});