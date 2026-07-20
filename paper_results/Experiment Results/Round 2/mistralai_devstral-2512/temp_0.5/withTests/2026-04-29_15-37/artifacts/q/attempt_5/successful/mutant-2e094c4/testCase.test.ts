import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
    it("should correctly filter stack traces in Node.js environment", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a promise chain that will generate a stack trace
        const deferred = Q.defer();
        const error = new Error("Test error");

        // Simulate a stack trace with Node.js internal frames
        error.stack = `
Error: Test error
    at Test.<anonymous> (testCase.test.ts:10:20)
    at (module.js:47:26)
    at (node.js:123:45)
    at Test.<anonymous> (testCase.test.ts:15:10)
`.trim();

        deferred.reject(error);

        return deferred.promise.then(
            () => {
                throw new Error("Promise should have been rejected");
            },
            (err: Error) => {
                // Count how many lines contain Node.js internal frames
                const stackLines = err.stack?.split('\n') || [];
                const nodeFrameCount = stackLines.filter(line =>
                    line.includes("(node.js:") || line.includes("(module.js:")
                ).length;

                // In original code, Node.js frames should be filtered (count = 0)
                // In mutated code, they won't be filtered (count > 0)
                expect(nodeFrameCount).toBe(0);
            }
        );
    });
});