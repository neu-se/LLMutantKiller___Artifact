describe('Q.delay', () => {
    it('should not throw an error when timeout is provided', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        expect(() => Q.delay(Promise.resolve(), 100)).not.toThrowError();
    });
});