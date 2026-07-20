import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error("Test error");
        const rejectedPromise = Q.reject(error);

        rejectedPromise.catch((reason: any) => {
            const stack = reason.stack;
            expect(stack).toContain("Test error");
            expect(stack).not.toContain("filterStackString");
        });
    });
});