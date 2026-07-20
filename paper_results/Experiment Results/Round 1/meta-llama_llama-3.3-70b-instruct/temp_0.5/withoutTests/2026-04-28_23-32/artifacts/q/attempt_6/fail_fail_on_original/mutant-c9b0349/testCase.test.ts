import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should correctly handle isInternalFrame function", () => {
        const error = new Error();
        const promise = q.reject(error);
        const stack = promise.stack;
        if (stack) {
            const lines = stack.split("\n");
            const isInternalFrame = (line: string) => {
                return line.includes("q.js");
            };
            const internalFrames = lines.filter(isInternalFrame);
            expect(internalFrames.length).toBeGreaterThan(0);
        } else {
            expect(true).toBe(false);
        }
    });
});