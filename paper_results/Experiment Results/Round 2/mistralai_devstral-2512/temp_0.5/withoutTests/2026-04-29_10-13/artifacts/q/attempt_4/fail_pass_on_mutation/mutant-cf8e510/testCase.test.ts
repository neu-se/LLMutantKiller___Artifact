const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise error handling", () => {
    it("should properly handle error stack traces when promise.stack exists and error is an object", () => {
        // Create a promise that will reject
        const deferred = Q.defer();
        const error = { message: "Test error", stack: "Error stack trace" };

        // Set up a long stack trace scenario
        Q.longStackSupport = true;
        const promise = deferred.promise;

        // Simulate the internal structure that would have a stack property
        (promise as any).stack = "Some stack trace";

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