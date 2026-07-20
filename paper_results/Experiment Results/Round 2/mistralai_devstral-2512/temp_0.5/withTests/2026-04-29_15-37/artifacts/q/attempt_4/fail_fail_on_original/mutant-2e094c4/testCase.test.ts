import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
    it("should not filter Node.js frames when isNodeFrame is mutated", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a promise chain that will generate a stack trace
        const promise = Q.reject(new Error("Test error"));

        return promise.then(
            () => {
                throw new Error("Promise should have been rejected");
            },
            (err: Error) => {
                // Check if the stack trace contains Node.js internal frames
                const hasNodeFrames = err.stack?.includes("(node.js:") || err.stack?.includes("(module.js:");

                // In the original code, Node.js frames should be filtered out (false)
                // In the mutated code (where isNodeFrame always returns false), they won't be filtered (true)
                // We expect true because we want the test to fail on original code and pass on mutated code
                expect(hasNodeFrames).toBe(true);
            }
        );
    });
});