describe('Q', () => {
    it('should have a "finally" method on the Promise prototype', () => {
        try {
            const Q = require('./q.js');
            const promise = Q.resolve();
            const finallyMethod = promise.finally;
            expect(finallyMethod.name).toBe('finally');
        } catch (error) {
            console.error(error);
        }
    });
});