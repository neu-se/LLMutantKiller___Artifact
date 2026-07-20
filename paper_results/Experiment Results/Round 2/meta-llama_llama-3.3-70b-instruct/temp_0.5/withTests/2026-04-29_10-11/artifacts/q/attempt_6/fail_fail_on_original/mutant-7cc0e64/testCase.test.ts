describe('Q', () => {
    it('should call onUnhandledError with the correct context when process.domain is truthy', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q');
        const originalProcess = global.process;
        global.process = { domain: { bind: jest.fn() } } as any;

        const error = new Error();
        const onUnhandledError = jest.fn();
        Q.onerror = onUnhandledError;
        Q.done(Q.reject(error), null, null, null);
        expect(onUnhandledError).toHaveBeenCalledTimes(1);

        global.process = originalProcess;
    });
});