import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should filter out Node.js stack frames", () => {
        const error = new Error("Test error");

        // Simulate a promise chain
        const promise = q(10)
            .then(() => {
                throw error;
            })
            .catch((err: any) => {
                const stack = err.stack;
                expect(stack).not.toContain("isNodeFrame");
                return err;
            });

        return promise;
    });
});