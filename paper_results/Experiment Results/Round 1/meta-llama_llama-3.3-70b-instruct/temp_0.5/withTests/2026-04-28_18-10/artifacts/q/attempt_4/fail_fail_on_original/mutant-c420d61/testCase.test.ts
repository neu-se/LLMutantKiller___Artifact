import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out Node.js stack frames", () => {
        const error = new Error("Test error");

        // Simulate a promise chain
        const promise = Q()
            .then(() => {
                throw error;
            })
            .catch((err: any) => {
                const stack = err.stack;
                expect(stack).not.toContain("node.js:");
                return err;
            });

        return promise;
    });
});