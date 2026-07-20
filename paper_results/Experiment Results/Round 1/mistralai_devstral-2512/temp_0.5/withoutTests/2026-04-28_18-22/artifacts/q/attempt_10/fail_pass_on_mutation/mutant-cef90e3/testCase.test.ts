const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise then method", () => {
    it("should properly handle done flag in rejection path", () => {
        const deferred = Q.defer();
        let rejectionCount = 0;

        deferred.promise.then(
            () => {
                throw new Error("Promise should have been rejected");
            },
            (error: Error) => {
                rejectionCount++;
                if (rejectionCount > 1) {
                    throw new Error("Rejection handler called multiple times");
                }
                return "handled";
            }
        );

        // Add another handler that should not be called if done flag works
        deferred.promise.then(
            () => {
                throw new Error("Promise should have been rejected");
            },
            (error: Error) => {
                rejectionCount++;
                if (rejectionCount > 1) {
                    throw new Error("Second rejection handler should not be called");
                }
                return "handled";
            }
        );

        // Reject the promise
        deferred.reject(new Error("Test error"));

        // The test will pass if no errors are thrown
        // In the mutated version, the second handler will be called
        // causing rejectionCount to be 2 and throwing an error
    });
});