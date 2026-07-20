import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should track unhandled rejections', () => {
        Q.resetUnhandledRejections();
        var deferred = Q.defer();
        if (Q.trackUnhandledRejections === undefined) {
            throw new Error("trackUnhandledRejections is undefined");
        }
        deferred.reject('Test rejection');
        expect(Q.getUnhandledReasons().length).toBe(1);
    });
});