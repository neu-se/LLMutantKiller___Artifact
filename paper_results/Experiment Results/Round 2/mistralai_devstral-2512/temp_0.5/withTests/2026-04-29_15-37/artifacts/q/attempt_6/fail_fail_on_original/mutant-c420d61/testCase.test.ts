import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
    it("should correctly identify Node.js frames in stack traces", () => {
        // Create a promise that will generate a stack trace
        const deferred = Q.defer();
        const error = new Error("Test error");

        // Simulate a stack trace with Node.js internal frames
        error.stack = "Error: Test error\n    at Test.<anonymous> (test.js:10:15)\n    at (node.js:123:45)\n    at another.js:5:10";

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
                    // In original code, Node.js frames should be filtered out
                    // In mutated code, they should remain
                    const stack = err.stack || "";
                    const hasNodeFrame = stack.includes("(node.js:");
                    // The test should pass on original (hasNodeFrame=false) and fail on mutated (hasNodeFrame=true)
                    expect(hasNodeFrame).toBe(false);
                }
            );
        } finally {
            Q.longStackSupport = originalLongStackSupport;
        }
    });
});