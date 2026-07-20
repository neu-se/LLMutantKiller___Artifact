import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const originalStack = error.stack;
        if (originalStack) {
            const originalLines = originalStack.split("\n");
            const promise = Q((resolve: any, reject: any) => {
                reject(error);
            });
            return promise.catch((error: any) => {
                const stack = error.stack;
                if (stack) {
                    const lines = stack.split("\n");
                    expect(lines.length).toBeLessThan(originalLines.length);
                }
            });
        }
    });
});