import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly parse the stack line", () => {
        var error = new Error();
        error.stack = "a@http://example.com:10:5";
        var attemptOriginal = /.*@(.+):(\d+)$/.exec(error.stack.split("\n")[0]);
        var attemptMutated = /.@(.+):(\d+)$/.exec(error.stack.split("\n")[0]);
        expect(attemptOriginal).not.toBeNull();
        expect(attemptMutated).toBeNull();
    });
});