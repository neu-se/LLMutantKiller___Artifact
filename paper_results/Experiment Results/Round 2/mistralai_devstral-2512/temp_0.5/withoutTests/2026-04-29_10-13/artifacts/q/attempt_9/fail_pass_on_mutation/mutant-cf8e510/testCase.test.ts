const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise error handling", () => {
    it("should properly handle error stack traces when promise.stack is truthy and error is an object", () => {
        // Create a deferred promise
        const deferred = Q.defer();
        const error = { message: "Test error", stack: "Error stack" };
        const promise = deferred.promise;

        // Enable long stack support
        Q.longStackSupport = true;

        // Set promise.stack to a truthy value
        (promise as any).stack = "Some stack trace";

        // Reject with a non-Error object
        deferred.reject(error);

        // Return a promise that should handle the rejection
        return promise.then(
            () => {
                throw new Error("Should not resolve");
            },
            (e: any) => {
                // The mutation changes the condition logic, so this should fail differently
                expect(e).toBe(error);
                return "handled";
            }
        ).then((result) => {
            expect(result).toBe("handled");
        });
    });
});