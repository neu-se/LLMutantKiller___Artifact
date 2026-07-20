describe('Q.delay', () => {
    it('should throw an error when timeout is not a positive number', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        expect(() => Q.delay(Promise.resolve(), -100)).toThrowError();
    });
});