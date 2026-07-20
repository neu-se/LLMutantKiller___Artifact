import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const error = new Error();
        const promise = Q.resolve();
        const stack = error.stack;
        const filteredStack = Q.makeStackTraceLong(error, promise);
        expect(filteredStack).not.toContain("q.js");
    });
});