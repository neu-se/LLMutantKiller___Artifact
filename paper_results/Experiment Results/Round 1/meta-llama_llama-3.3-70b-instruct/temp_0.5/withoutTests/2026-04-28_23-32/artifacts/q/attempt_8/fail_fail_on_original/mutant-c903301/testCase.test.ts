describe('Q promise', () => {
    it('should not throw an error when progress callback is called without throwing an error', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q').Q;
        const promise = Q.resolve();
        const progressCallback = () => {};
        const rejectCallback = jest.fn();
        promise.then(void 0, rejectCallback, progressCallback);
        expect(rejectCallback).not.toHaveBeenCalled();
    });
});