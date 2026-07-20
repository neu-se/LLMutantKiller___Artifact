const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling", () => {
    it("should properly re-throw uncaught exceptions in browser environment", (done) => {
        // Track if the error was properly re-thrown
        let errorThrown = false;

        // Override the global error handler to detect re-thrown errors
        const originalOnerror = window.onerror;
        window.onerror = function(message, source, lineno, colno, error) {
            if (error && error.message === "Handler error") {
                errorThrown = true;
            }
            return originalOnerror && originalOnerror(message, source, lineno, colno, error);
        };

        // Create a promise that throws an error in its handler
        const error = new Error("Test error");
        const promise = Q.reject(error);

        // Attach a handler that throws another error
        promise.then(null, () => {
            throw new Error("Handler error");
        });

        // In the original code, the error should be re-thrown via setTimeout
        // In the mutated code, the setTimeout does nothing
        setTimeout(() => {
            window.onerror = originalOnerror;

            if (errorThrown) {
                done();
            } else {
                done(new Error("Expected 'Handler error' to be re-thrown"));
            }
        }, 50);
    });
});