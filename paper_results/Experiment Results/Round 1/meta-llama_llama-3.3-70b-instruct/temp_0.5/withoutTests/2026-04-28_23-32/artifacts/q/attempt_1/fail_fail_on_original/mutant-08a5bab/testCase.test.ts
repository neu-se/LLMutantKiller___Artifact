import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const error = new Error();
        const stack = error.stack;
        const filteredStack = Q.filterStackString(stack);
        expect(filteredStack).not.toContain("q.js");
    });
});