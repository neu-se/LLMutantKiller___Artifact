const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling", () => {
    it("should properly handle uncaught exceptions in non-Node environments", (done) => {
        // Create a promise that throws an error in its handler
        const error = new Error("Test error");
        const promise = Q.reject(error);

        // Track if the error was properly handled
        let errorHandled = false;

        // Attach a handler that throws another error
        promise.then(null, () => {
            throw new Error("Handler error");
        }).then(
            () => {
                // Should not reach here
                done(new Error("Promise should not resolve"));
            },
            (e) => {
                // This should be called in the original code
                errorHandled = true;
                done();
            }
        );

        // In the original code, the error should be re-thrown via setTimeout
        // In the mutated code, the setTimeout does nothing, so the error won't be caught
        setTimeout(() => {
            if (!errorHandled) {
                done(new Error("Expected error to be handled"));
            }
        }, 50);
    });
});