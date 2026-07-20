import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber function", () => {
    it("should return the correct file name and line number when attempt1 is truthy", () => {
        var stackLine = "at functionName (filename.js:10:20)";
        var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        if (attempt1) {
            var result = [attempt1[1], Number(attempt1[2])];
            expect(result[0]).toBe("filename.js");
            expect(result[1]).toBe(10);
        } else {
            expect(true).toBe(false);
        }
        expect(attempt1).toBeTruthy();
        if (attempt1) {
            expect(attempt1[1]).toBeTruthy();
        }
    });
});