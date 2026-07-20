describe('Q', () => {
    it('should call dispatch when fcall is called on a promise', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q');
        const promise = Q();
        const originalDispatch = promise.dispatch;
        let dispatchCalled = false;
        promise.dispatch = function() {
            dispatchCalled = true;
            return originalDispatch.apply(this, arguments);
        };
        promise.fcall('test');
        expect(dispatchCalled).toBe(true);
    });
});