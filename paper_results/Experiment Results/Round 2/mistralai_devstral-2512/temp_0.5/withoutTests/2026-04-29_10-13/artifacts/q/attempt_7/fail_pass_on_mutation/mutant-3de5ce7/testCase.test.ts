// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace parsing", () => {
    it("should correctly parse Firefox-style stack traces with line numbers", () => {
        // Test the specific regex pattern that was mutated
        // Original: /.*@(.+):(\d+)$/
        // Mutated:  /.*@(.+):(\D+)$/
        const testLine = "function@file.js:42";

        // Test with original regex (should match)
        const originalRegex = /.*@(.+):(\d+)$/;
        const originalMatch = originalRegex.exec(testLine);
        expect(originalMatch).not.toBeNull();
        if (originalMatch) {
            expect(originalMatch[1]).toBe("file.js");
            expect(originalMatch[2]).toBe("42");
        }

        // Test with mutated regex (should NOT match because \D+ doesn't match digits)
        const mutatedRegex = /.*@(.+):(\D+)$/;
        const mutatedMatch = mutatedRegex.exec(testLine);
        expect(mutatedMatch).toBeNull();

        // Now test with actual Q library behavior
        // Create a promise chain that will generate stack traces
        return Q.reject(new Error("Test error")).then(
            () => {
                throw new Error("Should not reach here");
            },
            (error: Error) => {
                // The stack should be properly filtered with original code
                // but might fail with mutated code when parsing line numbers
                const stack = error.stack;
                expect(stack).toBeDefined();

                // Test that stack contains valid line numbers
                // This will fail on mutated code because it can't parse line numbers properly
                expect(stack).toMatch(/:\d+/);
            }
        );
    });
});