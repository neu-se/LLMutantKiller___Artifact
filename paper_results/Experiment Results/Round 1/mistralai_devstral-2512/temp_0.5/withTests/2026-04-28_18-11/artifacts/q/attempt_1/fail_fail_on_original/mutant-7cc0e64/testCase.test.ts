import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method with process.domain", () => {
    it("should handle errors correctly when process.domain is not available", () => {
        // Save the original process.domain if it exists
        const originalDomain = process.domain;

        // Delete process.domain to simulate an environment without it
        delete process.domain;

        let errorHandled = false;
        const testError = new Error("test error");

        // Set up error handler
        Q.onerror = (error) => {
            errorHandled = true;
            expect(error).toBe(testError);
        };

        // Create a rejected promise and call done() without handlers
        const promise = Q.reject(testError);
        promise.done();

        // Restore original process.domain
        process.domain = originalDomain;

        // Return a promise that will check if the error was handled
        return Q.delay(10).then(() => {
            expect(errorHandled).toBe(true);
        });
    });
});