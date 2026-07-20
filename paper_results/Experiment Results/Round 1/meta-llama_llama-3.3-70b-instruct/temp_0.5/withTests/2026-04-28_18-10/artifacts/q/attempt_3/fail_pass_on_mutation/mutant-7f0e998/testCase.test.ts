import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should filter out internal frames from stack traces", () => {
        const promise = Q((resolve, reject) => {
            reject(new Error());
        });
        return promise.catch((error) => {
            const stack = error.stack;
            expect(stack).toContain("q.js");
        });
    });
});