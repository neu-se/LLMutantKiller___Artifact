describe('Q', () => {
    it('should handle unhandled rejections', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const promise = Q.defer().promise;
        const onUnhandledError = jest.fn();
        Q.onerror = onUnhandledError;
        promise.done();
        promise.reject(new Error('Test error'));
        expect(onUnhandledError).toHaveBeenCalledTimes(1);
    });
});