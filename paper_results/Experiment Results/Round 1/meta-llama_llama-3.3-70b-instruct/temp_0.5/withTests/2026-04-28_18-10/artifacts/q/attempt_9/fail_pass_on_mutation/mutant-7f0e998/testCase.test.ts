import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const originalStack = error.stack;
        const promise = Q((resolve: any, reject: any) => {
            reject(error);
        });
        return promise.catch((error: any) => {
            const stack = error.stack;
            if (originalStack && stack) {
                expect(stack).not.toEqual(originalStack);
            }
        });
    });
});