const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q error handling", () => {
    it("should re-throw uncaught exceptions in browser environment", (done) => {
        // Create a promise that throws an error in its handler
        const error = new Error("Test error");
        const promise = Q.reject(error);

        // Track if the error was re-thrown
        let errorThrown = false;

        // Override Q.onerror to detect re-thrown errors
        const originalOnerror = Q.onerror;
        Q.onerror = function(e) {
            if (e && e.message === "Handler error") {
                errorThrown = true;
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

            if (errorThrown) {
                done();
            } else {
                done(new Error("Expected 'Handler error' to be re-thrown"));
            }
        }, 50);
    });
});