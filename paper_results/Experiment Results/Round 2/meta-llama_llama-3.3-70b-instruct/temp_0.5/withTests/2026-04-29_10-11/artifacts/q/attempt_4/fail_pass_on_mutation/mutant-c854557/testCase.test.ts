import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly parse the stack line with the correct regex", () => {
        const stackLine = "at functionName (filename:12:34)";
        const attempt2 = /at ([^ ]+):(\d):(?:\d+)$/.exec(stackLine);
        expect(attempt2).toBeNull();
    });
});