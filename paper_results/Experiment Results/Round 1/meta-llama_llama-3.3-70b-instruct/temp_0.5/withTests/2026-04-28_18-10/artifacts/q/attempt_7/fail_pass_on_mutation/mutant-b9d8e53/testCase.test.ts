import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly handle stack traces", () => {
        const error = new Error("Test error");
        const stackLine = "at test (/path/to/test.js:10:10)";
        const attempt1 = /at .+ \((.+):(\d{2,}):(?:\d+)\)$/.exec(stackLine);
        const attempt2 = /at .+ \((.+):(\d):(?:\d+)\)$/.exec(stackLine);
        expect(attempt1).not.toBeNull();
        expect(attempt2).toBeNull();
    });
});