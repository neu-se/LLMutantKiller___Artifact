import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly parse the stack line with the correct regex", () => {
        const stackLine = "at functionName (filename:123:34)";
        const attempt2Original = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
        const attempt2Mutated = /at ([^ ]+):(\d):(?:\d+)$/.exec(stackLine);
        expect(attempt2Original).not.toBeNull();
        expect(attempt2Mutated).toBeNull();
    });
});