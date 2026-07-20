// Test case to detect the mutation in the isNodeFrame function
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
    it("should filter out Node.js internal frames from stack traces", () => {
        // Create a scenario that generates a stack trace with Node.js internal frames
        const deferred = Q.defer();
        const error = new Error("Test error");

        // Simulate a stack trace that includes Node.js internal frames
        error.stack = `
            Error: Test error
                at Test.<anonymous> (test.js:10:15)
                at node.js:123:45
                at another.js:5:10
        `.trim();

        // Force long stack traces to be enabled for this test
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        try {
            // Reject the promise with the error
            deferred.reject(error);

            // Handle the rejection to trigger stack trace filtering
            return deferred.promise.then(
                () => {
                    throw new Error("Should not resolve");
                },
                (err: Error) => {
                    // Check that the stack trace has been filtered
                    const filteredStack = err.stack;
                    expect(filteredStack).not.toContain("(node.js:");
                    expect(filteredStack).toContain("test.js:10:15");
                    expect(filteredStack).toContain("another.js:5:10");
                }
            );
        } finally {
            // Restore original setting
            Q.longStackSupport = originalLongStackSupport;
        }
    });
});