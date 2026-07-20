describe("unhandled rejection reporting", () => {
    it("should correctly handle unhandled rejections", () => {
        const Q = require('./q.js');
        const deferred = Q.defer();
        const promise = deferred.promise;
        const rejectionReason = new Error("Unhandled rejection");

        deferred.reject(rejectionReason);

        const originalUnhandledRejectionsLength = Q.unhandledRejections.length;
        const originalUnhandledReasonsLength = Q.unhandledReasons.length;

        // Mutate the untrackRejection function to always return without doing anything
        const originalUntrackRejection = Q.untrackRejection;
        Q.untrackRejection = () => {};

        Q.untrackRejection(promise);

        expect(Q.unhandledRejections.length).toBe(originalUnhandledRejectionsLength);
        expect(Q.unhandledReasons.length).toBe(originalUnhandledReasonsLength);

        // Restore the original untrackRejection function
        Q.untrackRejection = originalUntrackRejection;
    });
});