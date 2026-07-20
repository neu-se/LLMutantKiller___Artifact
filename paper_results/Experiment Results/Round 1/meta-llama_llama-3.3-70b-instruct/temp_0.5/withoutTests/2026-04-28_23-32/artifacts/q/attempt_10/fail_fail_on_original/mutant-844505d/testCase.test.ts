const Q = require('./q.js');

describe('Q', () => {
    it('should handle unhandled rejections', () => {
        const promise = Q.defer().promise;
        const onUnhandledError = jest.fn();
        Q.onerror = onUnhandledError;
        promise.done();
        promise.reject(new Error('Test error'));
        expect(onUnhandledError).toHaveBeenCalledTimes(1);
        if (typeof process === "object" && process.domain) {
            expect(process.domain.bind).toHaveBeenCalledTimes(1);
        }
    });
});