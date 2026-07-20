// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace parsing", () => {
    it("should correctly parse Firefox-style stack traces with line numbers", () => {
        // Create a promise that will generate a stack trace
        const promise = Q.reject(new Error("Test error"));

        // Enable long stack traces to trigger the parsing logic
        Q.longStackSupport = true;

        // Create a chain that will generate stack traces
        return promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (error: Error) => {
                // The stack should contain valid line numbers
                const stack = error.stack;
                expect(stack).toBeDefined();

                // Test that the stack contains properly parsed line numbers
                // The mutation changes \d+ to \D+ which breaks line number parsing
                // This will cause the stack filtering to fail
                const hasLineNumbers = stack && /:\d+/.test(stack);
                expect(hasLineNumbers).toBe(true);

                // More specific test for Firefox format with line numbers
                const firefoxPattern = /@[^:]+:\d+/;
                const hasFirefoxFormat = firefoxPattern.test(stack || "");
                expect(hasFirefoxFormat).toBe(true);
            }
        );
    });
});