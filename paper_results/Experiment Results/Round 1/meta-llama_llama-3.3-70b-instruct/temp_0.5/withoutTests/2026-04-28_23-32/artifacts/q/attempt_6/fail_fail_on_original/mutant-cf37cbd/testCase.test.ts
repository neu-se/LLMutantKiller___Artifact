import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly parse stack lines", () => {
        const stackLine = "at foo.js:123:45";
        const attempt2_original = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
        const attempt2_mutated = /at ([^ ]+):(\d+):(\d)$/.exec(stackLine);
        expect(attempt2_original![2]).toBe("45");
        expect(attempt2_mutated![2]).toBe("4");
    });
});