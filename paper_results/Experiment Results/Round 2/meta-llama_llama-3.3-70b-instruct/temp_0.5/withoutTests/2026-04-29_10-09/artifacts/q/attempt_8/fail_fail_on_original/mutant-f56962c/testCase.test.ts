describe('Q', () => {
    it('should call dispatch when fcall is called on a promise', () => {
        const Q = require('../../../../../../../../subject_repositories/q/q');
        const promise = Q();
        const dispatchSpy = jest.fn(promise.dispatch);
        promise.dispatch = dispatchSpy;
        promise.fcall('test');
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
    });
});