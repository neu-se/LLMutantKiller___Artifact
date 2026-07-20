const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise error handling", () => {
    it("should properly handle error stack traces when promise.stack is falsy and error is not an object", () => {
        // Create a deferred promise
        const deferred = Q.defer();
        const error = "Simple error string";
        const promise = deferred.promise;

        // Enable long stack support
        Q.longStackSupport = true;

        // Set promise.stack to falsy
        (promise as any).stack = null;

        // Reject with a string error
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