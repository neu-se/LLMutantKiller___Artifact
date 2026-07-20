import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
    it("should filter Node.js internal frames from error stacks", () => {
        // Create a promise that will generate a stack trace
        const deferred = Q.defer();
        const error = new Error("Test error");

        // Simulate a stack trace with Node.js internal frames
        error.stack = `
            Error: Test error
                at Test.<anonymous> (test.js:10:15)
                at (node.js:123:45)
                at another.js:5:10
        `.trim();

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
                    const stackLines = err.stack.split('\n');
                    const hasNodeFrame = stackLines.some(line =>
                        line.includes("(node.js:")
                    );
                    expect(hasNodeFrame).toBe(false);
                }
            );
        } finally {
            Q.longStackSupport = originalLongStackSupport;
        }
    });
});