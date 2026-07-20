describe('Q promise', () => {
    it('should reject promise when error is thrown in progress callback', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q').Q;
        const promise = Q.resolve();
        const progressCallback = () => { throw new Error('Test error'); };
        const rejectCallback = jest.fn();
        promise.then(void 0, rejectCallback, progressCallback);
        expect(rejectCallback).toHaveBeenCalledTimes(1);
    });
});