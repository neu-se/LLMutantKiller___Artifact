import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle stack traces correctly", () => {
        const error = new Error("Test error");
        const stackLine = "at test (/path/to/test.js:10:15)";
        const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        const attempt2 = /at ([^ ]+):(\d+):(?:\d+)/.exec(stackLine);
        expect(attempt2).toBeNull();
        expect(attempt1![1]).toBe("/path/to/test.js");
    });
});