describe('Q', () => {
    it('should not allow a non-function callback in the finally method', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const callback = "not a function";
        expect(() => Q().finally(callback)).toThrowError();
    });
});