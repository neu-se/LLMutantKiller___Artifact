import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections when trackUnhandledRejections is true', (done) => {
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        Q.stopUnhandledRejectionTracking();
        Q.trackUnhandledRejections = true;
        var deferred = Q.defer();
        Q.nextTick.runAfter(function () {
            deferred.reject('Test rejection');
        });
        setTimeout(function () {
            expect(Q.getUnhandledReasons().length).toBe(1);
            done();
        }, 100);
    });

    it('should not track unhandled rejections when trackUnhandledRejections is false', (done) => {
        Q.stopUnhandledRejectionTracking();
        Q.resetUnhandledRejections();
        Q.trackUnhandledRejections = false;
        var deferred = Q.defer();
        Q.nextTick.runAfter(function () {
            deferred.reject('Test rejection');
        });
        setTimeout(function () {
            expect(Q.getUnhandledReasons().length).toBe(0);
            done();
        }, 100);
    });
});