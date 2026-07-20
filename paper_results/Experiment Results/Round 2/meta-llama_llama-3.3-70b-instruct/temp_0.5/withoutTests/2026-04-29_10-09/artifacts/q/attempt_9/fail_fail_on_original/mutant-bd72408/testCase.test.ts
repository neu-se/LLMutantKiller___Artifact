describe('Q promise', () => {
    it('should add progress listeners when "when" operation is used with a progress operand', () => {
        const Q = require('./q');
        const deferred = Q.defer();
        const promise = deferred.promise;
        const progressListener = jest.fn();
        promise.then(null, null, progressListener);
        deferred.notify('progress');
        expect(progressListener).toHaveBeenCalledTimes(1);
        expect(progressListener).toHaveBeenCalledWith('progress');
    });
});