const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling", () => {
    it("should re-throw uncaught exceptions in browser environment", (done) => {
        // Create a promise that will throw an error
        const promise = Q.reject(new Error("Initial error"));

        // Track if the error was re-thrown
        let errorReThrown = false;

        // Override the global error handler
        const originalOnerror = Q.onerror;
        Q.onerror = function(e: Error) {
            if (e.message === "Handler error") {
                errorReThrown = true;
            }
            if (originalOnerror) {
                originalOnerror(e);
            }
        };

        // Attach a handler that throws another error
        promise.then(null, () => {
            throw new Error("Handler error");
        });

        // In the original code, the error should be re-thrown via setTimeout
        // In the mutated code, the setTimeout does nothing
        setTimeout(() => {
            Q.onerror = originalOnerror;

            if (errorReThrown) {
                done();
            } else {
                done(new Error("Expected 'Handler error' to be re-thrown via Q.onerror"));
            }
        }, 100);
    });
});