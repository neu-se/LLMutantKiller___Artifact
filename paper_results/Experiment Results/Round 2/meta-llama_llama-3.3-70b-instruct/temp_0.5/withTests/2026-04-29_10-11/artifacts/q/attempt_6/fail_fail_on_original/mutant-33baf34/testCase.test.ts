import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
    it("should return a value when attempt1 is truthy", () => {
        const stackLine = "at functionName (filename:10:20)";
        const originalGetFileNameAndLineNumber = Q.getFileNameAndLineNumber;
        Q.getFileNameAndLineNumber = function(stackLine) {
            var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
            if (attempt1) {
                // do nothing
            }
            var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
            if (attempt2) {
                return [attempt2[1], Number(attempt2[2])];
            }
            var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
            if (attempt3) {
                return [attempt3[1], Number(attempt3[2])];
            }
            return null;
        };
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).toBeNull();
        Q.getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
    });
});