import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        Q.resetUnhandledRejections();
        Q.trackUnhandledRejections = true;
        var deferred = Q.defer();
        deferred.reject('Test rejection');
        expect(Q.unhandledRejections.length).toBe(1);
    });
});