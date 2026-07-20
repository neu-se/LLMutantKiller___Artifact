import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const rejectedPromise = Q.reject(error);

        rejectedPromise.catch((reason: any) => {
            const stack = reason.stack;
            const lines = stack.split("\n");
            const isInternalFrameFound = lines.some((line: string) => line.includes("isInternalFrame"));
            expect(isInternalFrameFound).toBe(false);
        });
    });
});