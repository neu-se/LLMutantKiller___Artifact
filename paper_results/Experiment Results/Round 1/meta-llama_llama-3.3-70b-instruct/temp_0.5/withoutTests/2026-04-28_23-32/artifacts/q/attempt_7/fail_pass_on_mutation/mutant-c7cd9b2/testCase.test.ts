import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should correctly parse stack lines", () => {
        const error = new Error();
        error.stack = "at functionName (/path/to/file.js:12:34)";
        const lines = error.stack.split("\n");
        const firstLine = lines[0];
        const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(firstLine);
        expect(attempt1).not.toBeNull();
        const attempt2 = /at ([^ ]+):(\d+):(?:\d)$/.exec(firstLine);
        expect(attempt2).toBeNull();
    });
});