const Q = require('../../../../q.js');

describe("unhandled rejection reporting", () => {
    it("should correctly handle unhandled rejections", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const rejectionReason = new Error("Unhandled rejection");

        deferred.reject(rejectionReason);

        const originalUnhandledRejectionsLength = Q.unhandledRejections.length;
        const originalUnhandledReasonsLength = Q.unhandledReasons.length;

        if (Q.unhandledRejections.includes(promise)) {
            Q.unhandledRejections.splice(Q.unhandledRejections.indexOf(promise), 1);
            Q.unhandledReasons.splice(Q.unhandledReasons.indexOf(rejectionReason), 1);
        }

        expect(Q.unhandledRejections.length).toBeLessThan(originalUnhandledRejectionsLength);
        expect(Q.unhandledReasons.length).toBeLessThan(originalUnhandledReasonsLength);
    });
});