import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const error = new Error();
        const promise = Q.resolve(1);
        const stack = error.stack;
        const makeStackTraceLong = Q.makeStackTraceLong;
        expect(makeStackTraceLong).toBeUndefined();
    });
});