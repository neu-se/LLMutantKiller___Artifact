import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        Q.resetUnhandledRejections();
        var deferred = Q.defer();
        var promise = deferred.promise;
        Q.nextTick.runAfter(function () {
            deferred.reject('Test rejection');
        });
        Q.nextTick.runAfter(function () {
            expect(Q.getUnhandledReasons().length).toBe(1);
        });
    });
});