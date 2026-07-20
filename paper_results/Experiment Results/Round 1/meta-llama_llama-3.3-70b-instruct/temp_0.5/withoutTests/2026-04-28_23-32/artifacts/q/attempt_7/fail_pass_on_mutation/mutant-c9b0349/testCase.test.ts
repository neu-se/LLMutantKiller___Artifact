import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should correctly handle isInternalFrame function", () => {
        const error = new Error();
        const promise = q.reject(error);
        promise.catch((err) => {
            const stack = err.stack;
            if (stack) {
                const lines = stack.split("\n");
                const isInternalFrame = (line: string) => {
                    return line.includes("q.js") && line.includes("isInternalFrame");
                };
                const internalFrames = lines.filter(isInternalFrame);
                expect(internalFrames.length).toBe(0);
            }
        });
    });
});