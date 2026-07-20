import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly parse stack lines", () => {
        const stackLine = "at foo.js:123:4";
        const attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
        expect(attempt2).not.toBeNull();
        expect(attempt2![1]).toBe("foo.js");
        expect(attempt2![2]).toBe("123");
    });
});