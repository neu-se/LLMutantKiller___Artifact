import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly parse stack lines", () => {
        const stackLine = "at /path/to/file.js:12:34";
        const attempt2 = /at ([^ ]+):(\d+):(?:\d)$/.exec(stackLine);
        expect(attempt2).not.toBeNull();
    });
});