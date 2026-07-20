describe('promise nodeify', () => {
    it('should return the promise when no callback is provided', () => {
        const Q = require('../../../../q');
        const promise = Q(10);
        const result = promise.nodeify();
        expect(result).toBe(promise);
    });
});