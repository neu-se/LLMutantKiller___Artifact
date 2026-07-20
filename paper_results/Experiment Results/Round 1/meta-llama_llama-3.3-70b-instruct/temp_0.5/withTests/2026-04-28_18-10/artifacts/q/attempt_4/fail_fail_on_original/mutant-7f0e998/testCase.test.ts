import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const originalStack = error.stack;
        const lines = originalStack.split("\n");
        const internalFrame = lines.find(line => line.includes("isInternalFrame"));
        expect(internalFrame).not.toBeUndefined();
        const promise = Q((resolve, reject) => {
            reject(error);
        });
        return promise.catch((error) => {
            const stack = error.stack;
            const lines = stack.split("\n");
            const internalFrame = lines.find(line => line.includes("isInternalFrame"));
            expect(internalFrame).toBeUndefined();
        });
    });
});