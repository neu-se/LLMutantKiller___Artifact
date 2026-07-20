// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace parsing", () => {
    it("should correctly parse Firefox-style stack traces with line numbers", () => {
        // Create a promise chain that will generate long stack traces
        Q.longStackSupport = true;

        // Create a deep promise chain to trigger stack trace generation
        let promise = Q.reject(new Error("Initial error"));
        for (let i = 0; i < 5; i++) {
            promise = promise.then(() => {
                throw new Error(`Error at level ${i}`);
            });
        }

        return promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (error: Error) => {
                // The stack should contain Firefox-style lines with line numbers
                const stack = error.stack;
                expect(stack).toBeDefined();

                // Test that the stack contains properly parsed line numbers
                // The mutation changes \d+ to \D+ which breaks line number parsing
                // This will cause the stack filtering to fail
                const hasValidLineNumbers = stack && stack.includes(":");
                expect(hasValidLineNumbers).toBe(true);

                // More specific test for Firefox format
                const firefoxPattern = /@[^:]+:\d+/;
                const hasFirefoxFormat = firefoxPattern.test(stack || "");
                expect(hasFirefoxFormat).toBe(true);
            }
        );
    });
});