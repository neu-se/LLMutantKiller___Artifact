describe('Q.defer', () => {
    it('should notify progress listeners when notify is called on the deferred object', () => {
        const Q = require('./q');
        const deferred = Q.defer();
        const progressListener = jest.fn();
        deferred.promise.progress(progressListener);
        deferred.notify('progress');
        expect(progressListener).toHaveBeenCalledTimes(1);
        expect(progressListener).toHaveBeenCalledWith('progress');
        
        // Test the mutation by checking if the notify method is called when resolvedPromise is false
        const originalNotify = deferred.notify;
        deferred.notify = jest.fn();
        deferred.resolve('value');
        expect(deferred.notify).toHaveBeenCalledTimes(0);
    });
});