const Q = require('./q');

describe('Q', () => {
    it('should handle rejections correctly', () => {
        const promise = Q.reject(new Error('Test error'));
        const spy = jest.fn();
        promise.then(null, spy);
        expect(spy).toHaveBeenCalledTimes(1);
    });
});