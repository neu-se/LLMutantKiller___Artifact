import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', (done) => {
        Q.resetUnhandledRejections();
        var deferred = Q.defer();
        Q.nextTick.runAfter(function () {
            deferred.reject('Test rejection');
        });
        Q.nextTick.runAfter(function () {
            Q.nextTick.runAfter(function () {
                expect(Q.getUnhandledReasons().length).toBe(1);
                done();
            });
        });
    });
});