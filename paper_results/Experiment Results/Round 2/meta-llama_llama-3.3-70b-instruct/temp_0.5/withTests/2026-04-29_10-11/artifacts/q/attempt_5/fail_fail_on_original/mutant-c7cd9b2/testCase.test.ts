import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const getFileNameAndLineNumber = (stackLine: string) => {
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
            return null;
        };

        const stackLine = "at functionName (filename:lineNumber:columnNumber)";
        const result = getFileNameAndLineNumber(stackLine);
        if (result) {
            expect(result[0]).toBe("filename");
            expect(result[1]).toBe(0); // lineNumber is not actually parsed, it's just a string
        } else {
            expect(true).toBe(false);
        }
    });
});