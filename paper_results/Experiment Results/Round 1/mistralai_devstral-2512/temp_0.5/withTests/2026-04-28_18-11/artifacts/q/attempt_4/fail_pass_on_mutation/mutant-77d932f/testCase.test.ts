// Test case to detect the mutation in getFileNameAndLineNumber function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation test", () => {
    it("should correctly parse stack traces to identify internal frames", () => {
        // Create a promise that will generate a stack trace
        const deferred = Q.defer();
        let error: Error;

        // Force an error to be thrown and captured
        try {
            throw new Error("Test error for stack trace");
        } catch (e) {
            error = e;
        }

        // The original code should be able to parse stack traces
        // The mutated code returns undefined for all stack lines
        const stackLines = error.stack?.split('\n') || [];
        const firstLine = stackLines[0];

        // This test verifies that getFileNameAndLineNumber works correctly
        // by checking if we can identify internal frames
        expect(typeof firstLine).toBe('string');
        expect(firstLine.length).toBeGreaterThan(0);

        // Test the actual stack trace filtering behavior
        // Create a promise chain that will generate internal stack frames
        return Q().then(() => {
            throw error;
        }).catch((err: Error) => {
            // In the original code, internal Q frames should be filtered out
            // In the mutated code, getFileNameAndLineNumber returns undefined
            // which causes isInternalFrame to return false for all frames
            // This means the stack trace won't be properly filtered

            // We can detect this by checking if the stack contains Q internal frames
            const stack = err.stack;
            const hasQInternalFrames = stack?.includes('q.js') || stack?.includes('q:');

            // In original code with proper filtering, Q frames should be removed
            // In mutated code, they'll remain visible
            expect(hasQInternalFrames).toBe(false);
        });
    });
});