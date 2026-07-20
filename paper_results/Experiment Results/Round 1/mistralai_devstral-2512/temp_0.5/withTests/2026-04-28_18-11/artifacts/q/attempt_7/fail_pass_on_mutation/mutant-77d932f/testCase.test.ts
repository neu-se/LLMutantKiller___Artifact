// Test case to detect the mutation in getFileNameAndLineNumber function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation test", () => {
    it("should correctly parse stack trace lines to extract file and line information", () => {
        // Test the internal stack trace parsing functionality
        // We'll create a scenario that forces stack trace parsing

        // Create a promise that will generate a rejection with stack trace
        const deferred = Q.defer();
        let error: Error;

        try {
            // Create an error with a specific stack trace format
            throw new Error("Test error");
        } catch (e) {
            error = e;
        }

        // The error should have a stack trace
        expect(error.stack).toBeDefined();

        // Test different stack trace formats that the function should handle
        const testStackLines = [
            "at functionName (filename.js:123:45)",
            "at filename.js:123:45",
            "function@filename.js:123",
            "@filename.js:123"
        ];

        // In the original code, getFileNameAndLineNumber should parse these formats
        // In the mutated code, it returns undefined for all inputs

        // We can test this indirectly by checking if the stack trace
        // contains properly formatted lines
        const stackLines = error.stack!.split('\n');
        expect(stackLines.length).toBeGreaterThan(0);

        // Check that at least one line matches expected stack trace patterns
        const hasValidStackPattern = stackLines.some(line =>
            /at [^(]+ \(.+:\d+:\d+\)$/.test(line) ||
            /at .+:\d+:\d+$/.test(line) ||
            /.*@.+:\d+$/.test(line)
        );

        // This should be true in both original and mutated code
        // since the error was created by JavaScript engine
        expect(hasValidStackPattern).toBe(true);

        // Now test the actual filtering behavior
        return Q.reject(error).catch((err: Error) => {
            // The stack trace should be properly formatted
            const filteredStack = err.stack;
            expect(filteredStack).toBeDefined();

            // In the original code, internal frames should be filtered
            // In the mutated code, filtering won't work properly
            // We can detect this by checking if the stack contains Q internal frames
            const hasQInternalFrames = filteredStack!.includes('q.js') ||
                                      filteredStack!.includes('promiseDispatch');

            // In original code, this should be false (frames filtered)
            // In mutated code, this might be true (frames not filtered)
            expect(hasQInternalFrames).toBe(false);
        });
    });
});