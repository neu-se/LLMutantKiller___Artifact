import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should filter out internal frames from stack traces", () => {
        const promise = Q((resolve: any, reject: any) => {
            reject(new Error("Test error"));
        });
        return promise.catch((error: any) => {
            const stack = error.stack;
            if (stack) {
                const lines = stack.split("\n");
                const internalFrame = lines.find((line: string) => line.includes("filterStackString"));
                expect(internalFrame).toBeUndefined();
            }
        });
    });
});