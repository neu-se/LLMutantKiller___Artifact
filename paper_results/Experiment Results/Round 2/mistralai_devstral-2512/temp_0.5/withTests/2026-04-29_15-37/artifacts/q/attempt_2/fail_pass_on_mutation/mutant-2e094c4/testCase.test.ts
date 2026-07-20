import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isNodeFrame mutation detection", () => {
    it("should correctly identify Node.js stack frames", () => {
        // Create a promise that will generate a stack trace
        const promise = Q.reject(new Error("Test error"));

        // Return the promise and check the stack trace filtering
        return promise.then(
            () => {
                throw new Error("Promise should have been rejected");
            },
            (err: Error) => {
                // The original code should filter out Node.js frames
                // The mutated code will not filter them
                const hasNodeFrames = err.stack?.includes("(node.js:") || err.stack?.includes("(module.js:");

                // In the original code, Node.js frames should be filtered out
                // In the mutated code, they won't be filtered
                expect(hasNodeFrames).toBe(false);
            }
        );
    });
});