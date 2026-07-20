const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling", () => {
    it("should properly handle uncaught exceptions in browser environment", (done) => {
        // Create a promise that will throw an error
        const promise = Q.reject(new Error("Initial error"));

        // Track if the error was handled
        let errorHandled = false;

        // Attach a handler that throws another error
        promise.then(null, () => {
            throw new Error("Handler error");
        }).then(
            () => {
                // Should not reach here
                done(new Error("Promise should not resolve"));
            },
            (e: Error) => {
                // This should be called in the original code
                if (e.message === "Handler error") {
                    errorHandled = true;
                }
            }
        );

        // In the original code, the error should be properly handled
        // In the mutated code, the error handling might be different
        setTimeout(() => {
            if (errorHandled) {
                done();
            } else {
                done(new Error("Expected error to be handled"));
            }
        }, 50);
    });
});