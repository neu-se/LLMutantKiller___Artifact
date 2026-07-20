const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise error handling", () => {
    it("should properly handle error stack traces when hasStacks is false", () => {
        // Create a promise that will reject
        const deferred = Q.defer();
        const error = new Error("Test error");
        const promise = deferred.promise;

        // Disable stack support
        Q.longStackSupport = false;

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
            }
        );
    });
});