import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly filter internal frames from stack traces", () => {
        const error = new Error();
        const stack = error.stack;
        const filteredStack = q.filterStackString(stack);
        expect(filteredStack).not.toContain("q.js");
    });
});