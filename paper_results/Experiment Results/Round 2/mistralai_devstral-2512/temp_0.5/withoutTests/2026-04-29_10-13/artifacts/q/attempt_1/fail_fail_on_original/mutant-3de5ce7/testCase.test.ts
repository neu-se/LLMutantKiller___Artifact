// Test case to detect the mutation in the stack trace parsing regex
import { Q } from "./q.js";

describe("Stack trace parsing", () => {
    it("should correctly parse Firefox-style stack traces with line numbers", () => {
        // Create a scenario that will generate a stack trace
        const deferred = Q.defer();
        let capturedStack: string | undefined;

        // Override the default error handling to capture the stack
        const originalOnError = Q.onerror;
        Q.onerror = function(error: Error) {
            capturedStack = error.stack;
            if (originalOnError) {
                originalOnError(error);
            }
        };

        // Force an error that will go through the stack trace filtering
        deferred.promise.then(() => {
            throw new Error("Test error");
        });

        deferred.reject(new Error("Initial error"));

        // Give the async operations time to complete
        return Q.delay(10).then(() => {
            // The mutation changes \d+ to \D+ which would fail to match digits
            // This test ensures that line numbers (digits) are properly captured
            expect(capturedStack).toBeDefined();
            // The stack should contain line numbers (digits) in Firefox format
            expect(capturedStack).toMatch(/@[^:]+:\d+/);
            Q.onerror = originalOnError;
        });
    });
});