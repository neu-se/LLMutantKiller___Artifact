import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle stack traces correctly", () => {
        const error = new Error("Test error");
        const stackLine = "at test (/path/to/test.js:10:15)";
        const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        const attempt2 = /at ([^ ]+):(\d+):(?:\d+)/.exec(stackLine);
        expect(attempt1).not.toBeNull();
        expect(attempt2).toBeNull();
    });
});