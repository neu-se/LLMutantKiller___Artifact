import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should correctly handle isInternalFrame function", () => {
        const error = new Error();
        const promise = q.reject(error);
        const stack = promise.stack;
        if (stack) {
            const lines = stack.split("\n");
            const filteredStack = lines.filter((line) => !line.includes("q.js"));
            expect(filteredStack.length).toBeGreaterThan(0);
        } else {
            expect(true).toBe(false);
        }
    });
});