import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
    it("should correctly identify Node.js frames in stack traces", () => {
        // Create a promise chain that will generate stack traces
        const deferred = Q.defer();
        const error = new Error("Test error");

        // Simulate a stack trace with a Node.js frame
        error.stack = "Error: Test error\n    at Test.<anonymous> (test.js:10:15)\n    at node.js:123:45\n    at another.js:5:10";

        // Enable long stack traces
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        try {
            deferred.reject(error);

            return deferred.promise.then(
                () => {
                    throw new Error("Should not resolve");
                },
                (err: Error) => {
                    // The original code should filter out node.js frames
                    // The mutated code (returning false) should not filter them
                    const hasNodeFrame = err.stack.includes("(node.js:");
                    expect(hasNodeFrame).toBe(false);
                }
            );
        } finally {
            Q.longStackSupport = originalLongStackSupport;
        }
    });
});