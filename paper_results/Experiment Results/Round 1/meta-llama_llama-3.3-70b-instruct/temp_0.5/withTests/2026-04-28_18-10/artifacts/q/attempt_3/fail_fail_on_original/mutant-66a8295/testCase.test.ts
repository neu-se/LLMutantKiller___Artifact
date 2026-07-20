import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        Q.resetUnhandledRejections();
        var deferred = Q.defer();
        Q.trackRejection(deferred.promise, 'Test rejection');
        expect(Q.getUnhandledReasons().length).toBe(1);
    });
});