const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("done method error handling", () => {
    it("should handle unhandled errors correctly", (done) => {
        // Create a rejected promise without error handlers
        const error = new Error("test error");
        const promise = Q.reject(error);

        // Set up a custom error handler
        let errorCaught = false;
        Q.onerror = (err) => {
            errorCaught = true;
            expect(err).toBe(error);
            done();
        };

        // Call done() without handlers to trigger unhandled error path
        promise.done();

        // Give it time to process
        setTimeout(() => {
            if (!errorCaught) {
                done(new Error("Error was not caught"));
            }
        }, 100);
    });
});