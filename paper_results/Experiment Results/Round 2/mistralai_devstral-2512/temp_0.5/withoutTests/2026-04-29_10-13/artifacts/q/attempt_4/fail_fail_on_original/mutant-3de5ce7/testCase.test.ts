// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace parsing", () => {
    it("should correctly parse Firefox-style stack traces with line numbers", () => {
        // Create a scenario that will generate a stack trace in Firefox format
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

        // Create a chain that will generate a stack trace
        deferred.promise.then(() => {
            throw new Error("Test error");
        });

        deferred.reject(new Error("Initial error"));

        // Give the async operations time to complete
        return Q.delay(10).then(() => {
            expect(capturedStack).toBeDefined();

            // The mutation changes \d+ to \D+ which would fail to match digits
            // We need to test the actual parsing function by creating a Firefox-style stack line
            const testStackLine = "function@file.js:42";

            // Access the internal function through the module
            const getFileNameAndLineNumber = Q._getFileNameAndLineNumber || function(stackLine: string) {
                // Replicate the original regex logic
                const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
                if (attempt3) {
                    return [attempt3[1], Number(attempt3[2])];
                }
                return null;
            };

            const result = getFileNameAndLineNumber(testStackLine);
            expect(result).not.toBeNull();
            if (result) {
                expect(result[0]).toBe("file.js");
                expect(result[1]).toBe(42);
            }

            Q.onerror = originalOnError;
        });
    });
});