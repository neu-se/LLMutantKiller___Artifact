const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise error handling", () => {
    it("should properly handle error stack traces with specific conditions", () => {
        // Create a promise that will reject
        const deferred = Q.defer();
        const error = new Error("Test error");
        const promise = deferred.promise;

        // Enable long stack support and ensure hasStacks is true
        Q.longStackSupport = true;

        // Set up the promise with stack trace
        (promise as any).stack = "Some stack trace";

        // Reject the promise
        deferred.reject(error);

        // Handle the rejection
        return promise.then(
            () => {
                throw new Error("Should not resolve");
            },
            (e: Error) => {
                // Verify the error is the one we expect
                expect(e).toBe(error);
                return true;
            }
        );
    });
});