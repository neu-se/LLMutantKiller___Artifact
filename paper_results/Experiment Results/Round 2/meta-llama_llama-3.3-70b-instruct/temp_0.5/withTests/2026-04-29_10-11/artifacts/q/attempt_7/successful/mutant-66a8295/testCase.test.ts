import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', (done) => {
        Q.resetUnhandledRejections();
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        var deferred = Q.defer();
        Q.nextTick.runAfter(function () {
            deferred.reject('Test rejection');
        });
        Q.nextTick.runAfter(function () {
            Q.stopUnhandledRejectionTracking();
        });
        setTimeout(function () {
            expect(Q.getUnhandledReasons().length).toBe(0);
            done();
        }, 100);
    });
});