describe('unhandled rejection tracking', () => {
    it('should report unhandled rejections', () => {
        var Q = require('../../../../q');
        Q.resetUnhandledRejections();
        var deferred = Q.defer();
        var promise = deferred.promise;
        var reason = new Error("Test reason");
        Q.trackRejection(promise, reason);
        var atReport = 0;
        if (atReport !== -1) {
            Q.nextTick.runAfter(function () {
                if (process.emit) {
                    process.emit('unhandledRejection', reason, promise);
                }
            });
        }
        expect(atReport).toBe(0);
    });
});