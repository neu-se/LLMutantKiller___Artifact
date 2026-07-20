describe('Q', () => {
    it('should invoke the ninvoke method correctly and return a promise', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const promise = Q();
        const name = 'testMethod';
        const args = ['arg1', 'arg2'];

        expect(() => {
            promise.ninvoke(name, ...args);
        }).not.toThrow();
    });
});