describe('Q promise', () => {
    it('should call progress listener when progress is notified', (done) => {
        let progressCalled = false;
        const Q = require('./q');
        const deferred = Q.defer();
        const promise = deferred.promise;
        promise.then(void 0, void 0, () => {
            progressCalled = true;
            done();
        });
        deferred.notify('test');
    });
});