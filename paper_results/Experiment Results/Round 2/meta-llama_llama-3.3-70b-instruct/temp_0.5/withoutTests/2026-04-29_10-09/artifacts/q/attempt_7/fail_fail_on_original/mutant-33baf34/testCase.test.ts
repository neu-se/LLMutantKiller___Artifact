import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly parse stack lines", () => {
        const stackLine = "at functionName (filename:123:45)";
        const originalGetFileNameAndLineNumber = getFileNameAndLineNumber;
        getFileNameAndLineNumber = function(stackLine: string) {
            var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
            if (attempt1) {
                return [attempt1[1], Number(attempt1[2])];
            }
            var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], Number(attempt2[2])];
            }
            var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
            if (attempt3) {
                return [attempt3[1], Number(attempt3[2])];
            }
        };
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["filename", 123]);
        getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});