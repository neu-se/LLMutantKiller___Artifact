import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out Node.js stack frames", () => {
        const error = new Error("Test error");
        const originalStack = error.stack;

        // Simulate a promise chain
        Q()
            .then(() => {
                throw error;
            })
            .catch((err) => {
                expect(err.stack).not.toContain("node.js:");
            });
    });
});