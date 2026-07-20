// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace parsing", () => {
    it("should correctly parse Firefox-style stack traces with line numbers", () => {
        // Create a promise that will generate a stack trace
        const promise = Q.reject(new Error("Test error"));

        // Force long stack traces to be enabled
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

                // Create a test case that directly tests the regex behavior
                // The mutation changes \d+ to \D+ which breaks line number matching
                const testLine = "someFunction@http://example.com:42:21";
                const originalRegex = /.*@(.+):(\d+)$/;
                const mutatedRegex = /.*@(.+):(\D+)$/;

                // Original should match
                const originalMatch = originalRegex.exec(testLine);
                expect(originalMatch).not.toBeNull();
                if (originalMatch) {
                    expect(originalMatch[1]).toBe("http://example.com:42:21");
                    expect(originalMatch[2]).toBe("21");
                }

                // Mutated should not match (because \D+ doesn't match digits)
                const mutatedMatch = mutatedRegex.exec(testLine);
                expect(mutatedMatch).toBeNull();

                // Now test with actual stack filtering
                // The filterStackString function should work with original code
                // but fail with mutated code when trying to parse line numbers
                const testStack = "Error: Test\n@http://example.com:42:21";
                const filtered = Q._filterStackString(testStack);
                expect(filtered).toContain("http://example.com:42:21");
            }
        );
    });
});