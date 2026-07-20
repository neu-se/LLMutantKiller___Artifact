import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should not have long stack traces by default", () => {
        var error = new Error();
        var stack = error.stack;
        expect(stack).not.toContain("q.js");
    });
});