import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
    it("should filter Node.js internal frames from stack traces", () => {
        // Create a promise chain that will generate a stack trace
        // with Node.js internal frames
        const deferred = Q.defer();
        const error = new Error("Test error");

        // Manually construct a stack trace that includes Node.js frames
        error.stack = `
Error: Test error
    at Test.<anonymous> (testCase.test.ts:10:20)
    at (module.js:47:26)
    at (node.js:123:45)
    at Test.<anonymous> (testCase.test.ts:15:10)
`.trim();

        // Force long stack traces to be enabled
        Q.longStackSupport = true;

        // Create a rejected promise with this error
        deferred.reject(error);

        // Return the promise and check if Node.js frames are filtered
        return deferred.promise.then(
            () => {
                throw new Error("Promise should have been rejected");
            },
            (err: Error) => {
                // In the original code, Node.js frames should be filtered out
                // In the mutated code (where isNodeFrame always returns false),
                // they won't be filtered
                const hasNodeFrames = err.stack?.includes("(node.js:") || err.stack?.includes("(module.js:");

                // This should be false in original code (frames filtered)
                // and true in mutated code (frames not filtered)
                expect(hasNodeFrames).toBe(false);
            }
        );
    });
});