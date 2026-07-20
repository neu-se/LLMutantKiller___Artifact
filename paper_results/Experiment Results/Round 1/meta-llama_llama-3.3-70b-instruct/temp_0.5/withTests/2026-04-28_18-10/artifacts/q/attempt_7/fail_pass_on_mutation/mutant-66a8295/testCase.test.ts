import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        Q.resetUnhandledRejections();
        var deferred = Q.defer();
        deferred.reject('Test rejection');
        Q.trackUnhandledRejections = false;
        deferred.reject('Test rejection 2');
        expect(Q.getUnhandledReasons().length).toBe(1);
    });
});