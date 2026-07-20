import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter internal frames from stack traces", () => {
        const error = new Error();
        const promise = Q.reject(error);
        const stack = promise.stack;
        expect(stack).not.toContain("q.js");
    });
});