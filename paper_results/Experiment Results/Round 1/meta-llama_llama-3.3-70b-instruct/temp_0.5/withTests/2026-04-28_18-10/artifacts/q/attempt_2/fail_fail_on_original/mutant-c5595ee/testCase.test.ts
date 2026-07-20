import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly parse the stack line", () => {
        var error = new Error();
        error.stack = "    at foo (http://example.com:10:5)";
        var attempt3 = /.*@(.+):(\d+)$/.exec(error.stack.split("\n")[0]);
        expect(attempt3).not.toBeNull();
    });
});