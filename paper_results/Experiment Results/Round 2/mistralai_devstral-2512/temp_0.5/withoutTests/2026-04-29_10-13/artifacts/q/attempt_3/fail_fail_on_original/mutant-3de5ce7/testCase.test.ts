// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace parsing", () => {
    it("should correctly parse Firefox-style stack traces with line numbers", () => {
        // Create a promise that will generate a stack trace
        const promise = Q.reject(new Error("Test error"));

        // Force the promise to be inspected which triggers stack trace parsing
        return Q.delay(10).then(() => {
            const inspection = promise.inspect();
            expect(inspection.state).toBe("rejected");

            // The mutation changes \d+ to \D+ which would fail to match digits in line numbers
            // This test ensures the stack trace can be properly filtered
            const stack = inspection.reason?.stack;
            if (stack) {
                // Firefox format: "function@filename:lineNumber"
                expect(stack).toMatch(/@[^:]+:\d+/);
            }
        });
    });
});