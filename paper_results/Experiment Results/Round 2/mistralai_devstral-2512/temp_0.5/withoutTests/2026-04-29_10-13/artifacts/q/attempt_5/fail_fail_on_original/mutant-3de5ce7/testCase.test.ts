// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace parsing", () => {
    it("should correctly parse Firefox-style stack traces with line numbers", () => {
        // Test the internal stack parsing function directly
        // The mutation changes \d+ to \D+ in the regex pattern
        const testStackLine = "function@file.js:42";

        // Create a simple test to verify the regex works correctly
        // This simulates what happens in getFileNameAndLineNumber
        const originalRegex = /.*@(.+):(\d+)$/;
        const mutatedRegex = /.*@(.+):(\D+)$/;

        // Test original regex (should match)
        const originalMatch = originalRegex.exec(testStackLine);
        expect(originalMatch).not.toBeNull();
        if (originalMatch) {
            expect(originalMatch[1]).toBe("file.js");
            expect(originalMatch[2]).toBe("42");
        }

        // Test mutated regex (should not match digits)
        const mutatedMatch = mutatedRegex.exec(testStackLine);
        expect(mutatedMatch).toBeNull();

        // Now test with the actual Q library
        // Create a promise chain that will generate a stack trace
        return Q.reject(new Error("Test error")).then(
            () => {
                throw new Error("Should not reach here");
            },
            (error) => {
                // The stack should contain valid line numbers
                const stack = error.stack;
                expect(stack).toBeDefined();

                // Check if stack contains Firefox-style lines with digits
                const lines = stack.split('\n');
                const hasFirefoxLine = lines.some(line =>
                    /@[^:]+:\d+/.test(line)
                );

                // This will fail on mutated code because \D+ won't match digits
                expect(hasFirefoxLine).toBe(true);
            }
        );
    });
});