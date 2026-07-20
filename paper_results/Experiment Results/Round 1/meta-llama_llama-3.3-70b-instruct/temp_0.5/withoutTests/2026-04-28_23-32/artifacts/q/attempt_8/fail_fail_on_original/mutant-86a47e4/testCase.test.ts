describe('Q promise', () => {
    it('should call progress listener when progress is notified', (done) => {
        let progressCalled = false;
        const Q = require('../../../../q');
        const deferred = Q.defer();
        const promise = deferred.promise;
        promise.progress(() => {
            progressCalled = true;
            done();
        });
        deferred.notify('test');
    });
});