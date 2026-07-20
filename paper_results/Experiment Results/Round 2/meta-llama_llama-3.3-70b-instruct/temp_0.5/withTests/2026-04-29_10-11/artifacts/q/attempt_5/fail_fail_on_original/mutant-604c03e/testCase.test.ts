const Q = require('../../../../q.js');

describe("unhandled rejection reporting", () => {
    it("should track and untrack rejections", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const rejectionReason = new Error("Unhandled rejection");
        deferred.reject(rejectionReason);

        const originalUnhandledRejectionsLength = Q.unhandledRejections.length;
        const originalUnhandledReasonsLength = Q.unhandledReasons.length;

        Q.untrackRejection(promise);

        expect(Q.unhandledRejections.length).toBeLessThan(originalUnhandledRejectionsLength);
        expect(Q.unhandledReasons.length).toBeLessThan(originalUnhandledReasonsLength);
    });
});