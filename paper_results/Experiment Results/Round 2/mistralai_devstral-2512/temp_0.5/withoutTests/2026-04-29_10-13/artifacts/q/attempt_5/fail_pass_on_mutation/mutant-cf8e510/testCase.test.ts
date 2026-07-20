const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise error handling", () => {
    it("should properly handle error stack traces when promise.stack is falsy and error is an object", () => {
        // Create a promise that will reject
        const deferred = Q.defer();
        const error = { message: "Test error", stack: "Error stack trace" };

        // Set up a long stack trace scenario
        Q.longStackSupport = true;
        const promise = deferred.promise;

        // Explicitly set promise.stack to falsy value
        (promise as any).stack = null;

        // Reject the promise with a non-Error object
        deferred.reject(error);

        // Handle the rejection to ensure the stack is processed
        return promise.then(
            () => {
                throw new Error("Should not resolve");
            },
            (e: any) => {
                // Verify the error is the one we expect
                expect(e).toBe(error);
            }
        );
    });
});