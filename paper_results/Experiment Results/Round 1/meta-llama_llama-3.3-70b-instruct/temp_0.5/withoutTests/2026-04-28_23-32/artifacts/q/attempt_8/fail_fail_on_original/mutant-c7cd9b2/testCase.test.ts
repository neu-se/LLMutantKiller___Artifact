import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should correctly parse stack lines", () => {
        const error = new Error();
        error.stack = "at /path/to/file.js:12:34";
        const lines = error.stack.split("\n");
        const firstLine = lines[0];
        const attempt2 = /at ([^ ]+):(\d+):(?:\d)$/.exec(firstLine);
        if (attempt2) {
            expect(attempt2[1]).toBe("/path/to/file.js");
            expect(attempt2[2]).toBe("12");
        } else {
            throw new Error("attempt2 is null");
        }
    });
});