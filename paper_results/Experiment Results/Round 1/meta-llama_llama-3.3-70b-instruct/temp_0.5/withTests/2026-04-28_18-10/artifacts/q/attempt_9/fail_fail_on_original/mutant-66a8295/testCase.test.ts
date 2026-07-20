import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        Q.resetUnhandledRejections();
        var deferred = Q.defer();
        deferred.reject('Test rejection');
        expect(Q.getUnhandledReasons().length).toBe(1);
        Q.stopUnhandledRejectionTracking();
        deferred.reject('Test rejection 2');
        expect(Q.getUnhandledReasons().length).toBe(1);
    });
});