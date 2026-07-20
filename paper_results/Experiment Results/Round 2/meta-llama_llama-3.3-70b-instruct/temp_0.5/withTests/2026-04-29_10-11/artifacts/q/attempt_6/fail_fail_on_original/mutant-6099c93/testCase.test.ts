describe("Q", () => {
    it("should test the behavior of untrackRejection", () => {
        const Q = require('../../../../../../../../subject_repositories/q/q.js');
        const deferred = Q.defer();
        const promise = deferred.promise;
        const reason = new Error("Test reason");
        Q.trackRejection(promise, reason);
        const reportedUnhandledRejections = Q.reportedUnhandledRejections;
        Q.untrackRejection(promise);
        expect(reportedUnhandledRejections.length).toBeGreaterThan(0);
    });
});