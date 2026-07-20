import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should correctly handle isInternalFrame function", () => {
        const error = new Error();
        const promise = q.reject(error);
        const stack = promise.stack;
        if (stack) {
            const lines = stack.split("\n");
            const internalFrameCountOriginal = lines.filter((line) => line.includes("isInternalFrame")).length;
            const originalCode = lines.filter((line) => !line.includes("isInternalFrame")).length;
            expect(internalFrameCountOriginal).toBeLessThan(originalCode);
        }
    });
});