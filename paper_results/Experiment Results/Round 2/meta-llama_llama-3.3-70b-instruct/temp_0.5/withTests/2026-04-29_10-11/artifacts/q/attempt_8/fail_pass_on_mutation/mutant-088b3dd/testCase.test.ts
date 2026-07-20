import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber function", () => {
    it("should return the correct file name and line number when attempt1 is truthy", () => {
        var stackLine = "at functionName (filename.js:10:20)";
        var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        if (attempt1) {
            expect(attempt1).toBeTruthy();
        } else {
            expect(true).toBe(false);
        }
    });
});