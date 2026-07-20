const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise then method", () => {
    it("should prevent multiple rejection handler calls when done flag is properly set", (done) => {
        const deferred = Q.defer();
        let rejectionCount = 0;

        const rejectionHandler = (error: Error) => {
            rejectionCount++;
            if (rejectionCount > 1) {
                done(new Error("Rejection handler called multiple times - mutation detected"));
                return;
            }
        };

        deferred.promise.then(null, rejectionHandler);
        deferred.promise.then(null, rejectionHandler);

        // Reject the promise
        deferred.reject(new Error("Test error"));

        // Give time for both handlers to potentially execute
        setTimeout(() => {
            if (rejectionCount === 1) {
                done();
            } else {
                done(new Error("Expected exactly 1 rejection call"));
            }
        }, 10);
    });
});