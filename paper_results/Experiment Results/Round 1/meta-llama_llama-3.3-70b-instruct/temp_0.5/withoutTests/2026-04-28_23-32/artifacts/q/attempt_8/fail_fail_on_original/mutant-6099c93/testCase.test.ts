const q = require('./q.js');

describe('Q', () => {
    it('should handle rejections correctly', () => {
        const Q = q();
        const promise = Q.reject(new Error('Test error'));
        const spy = jest.fn();
        const originalEmit = process.emit;
        process.emit = spy;
        Q.untrackRejection(promise);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith('rejectionHandled', expect.any(String), promise);
        process.emit = originalEmit;
    });
});