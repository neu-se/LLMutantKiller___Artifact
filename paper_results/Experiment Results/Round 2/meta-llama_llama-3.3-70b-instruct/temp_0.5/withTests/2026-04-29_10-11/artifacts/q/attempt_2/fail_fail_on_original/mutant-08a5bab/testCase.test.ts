import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        const error = new Error();
        const stackTrace = error.stack;

        const originalResult = Q.filterStackString(stackTrace);

        expect(originalResult).not.toContain("internal");
    });
});