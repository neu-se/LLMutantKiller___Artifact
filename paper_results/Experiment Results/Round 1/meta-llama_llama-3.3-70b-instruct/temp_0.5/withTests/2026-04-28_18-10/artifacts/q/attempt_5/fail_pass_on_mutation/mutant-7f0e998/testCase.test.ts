import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const originalStack = error.stack;
        if (originalStack) {
            const lines = originalStack.split("\n");
            const internalFrame = lines.find((line: string) => line.includes("isInternalFrame"));
            expect(internalFrame).toBeUndefined();
            const promise = Q((resolve: any, reject: any) => {
                reject(error);
            });
            return promise.catch((error: any) => {
                const stack = error.stack;
                if (stack) {
                    const lines = stack.split("\n");
                    const internalFrame = lines.find((line: string) => line.includes("isInternalFrame"));
                    expect(internalFrame).toBeUndefined();
                }
            });
        }
    });
});