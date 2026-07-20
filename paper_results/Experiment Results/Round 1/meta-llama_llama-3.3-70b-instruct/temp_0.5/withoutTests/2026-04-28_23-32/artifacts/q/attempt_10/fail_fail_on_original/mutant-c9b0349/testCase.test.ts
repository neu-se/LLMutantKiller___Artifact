import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should correctly handle isInternalFrame function", () => {
        const error = new Error();
        const promise = q.reject(error);
        const stack = promise.stack;
        if (stack) {
            const lines: string[] = stack.split("\n");
            const filteredStack = lines.filter((line: string) => !line.includes("q.js"));
            expect(filteredStack).not.toHaveLength(0);
        } else {
            expect(true).toBe(false);
        }
    });
});