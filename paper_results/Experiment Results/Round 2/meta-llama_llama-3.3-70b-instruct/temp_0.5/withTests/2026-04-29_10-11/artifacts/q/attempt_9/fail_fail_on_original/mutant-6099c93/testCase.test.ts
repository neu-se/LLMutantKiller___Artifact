describe("Q", () => {
    it("should test the behavior of untrackRejection", () => {
        const Q = require('../../../../q');
        const deferred = Q.defer();
        const promise = deferred.promise;
        const reason = new Error("Test reason");
        Q.trackRejection(promise, reason);
        const atReport = Q.reportedUnhandledRejections.indexOf(promise);
        expect(atReport).not.toBe(-1);
        Q.untrackRejection(promise);
        expect(Q.reportedUnhandledRejections[atReport]).toBeUndefined();
    });
});