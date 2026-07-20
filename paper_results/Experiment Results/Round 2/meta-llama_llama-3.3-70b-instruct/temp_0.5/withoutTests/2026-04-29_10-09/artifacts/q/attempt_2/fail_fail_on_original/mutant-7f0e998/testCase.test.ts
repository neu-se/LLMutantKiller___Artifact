import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const originalStack = error.stack;

        const QError = Q.reject(error);
        QError.then(null, (reason) => {
            const stack = reason.stack;
            expect(stack).not.toContain("isInternalFrame");
        });
    });
});