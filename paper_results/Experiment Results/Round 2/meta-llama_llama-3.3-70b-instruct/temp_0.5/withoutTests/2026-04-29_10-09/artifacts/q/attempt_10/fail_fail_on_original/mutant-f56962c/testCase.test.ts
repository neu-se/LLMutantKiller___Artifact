describe('Q', () => {
    it('should call dispatch when fcall is called on a promise', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q');
        const promise = Q();
        const originalDispatch = promise.dispatch;
        let dispatchCalled = false;
        promise.dispatch = function(...args) {
            dispatchCalled = true;
            return originalDispatch.apply(this, args);
        };
        promise.fcall('test');
        if (!dispatchCalled) {
            throw new Error('Dispatch was not called');
        }
    });
});