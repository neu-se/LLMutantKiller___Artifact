// Test case to detect the mutation in isNodeFrame function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
    it("should filter Node.js stack frames correctly", () => {
        // Create a promise chain that will generate a stack trace
        // with Node.js internal frames
        const deferred = Q.defer();
        const error = new Error("Test error");

        // Simulate a stack trace that includes Node.js internal frames
        // This will be filtered by the isNodeFrame function
        const stackTrace = `
Error: Test error
    at Test.<anonymous> (testCase.test.ts:10:20)
    at (module.js:47:26)
    at (node.js:123:45)
    at Test.<anonymous> (testCase.test.ts:15:10)
`.trim();

        // Override the stack property to simulate the stack trace
        error.stack = stackTrace;

        // Create a promise that will be rejected with this error
        Q.nextTick(() => {
            deferred.reject(error);
        });

        // Return the promise and check if Node.js frames are filtered
        return deferred.promise.then(
            () => {
                // Should not reach here
                throw new Error("Promise should have been rejected");
            },
            (err) => {
                // Check that the stack trace was filtered correctly
                // In the original code, Node.js frames should be filtered out
                // In the mutated code, they won't be filtered
                const filteredStack = err.stack;
                expect(filteredStack).not.toContain("(module.js:");
                expect(filteredStack).not.toContain("(node.js:");
            }
        );
    });
});