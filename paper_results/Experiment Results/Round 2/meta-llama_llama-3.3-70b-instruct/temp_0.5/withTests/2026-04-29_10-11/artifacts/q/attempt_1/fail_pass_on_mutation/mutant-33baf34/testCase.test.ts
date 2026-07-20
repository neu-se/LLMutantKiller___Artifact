import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber", () => {
    it("should return the correct file name and line number", () => {
        const stackLine = "at functionName (filename:lineNumber:columnNumber)";
        const attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
        if (attempt1) {
            const fileName = attempt1[1];
            const lineNumber = Number(attempt1[2]);
            expect(fileName).toBe("filename");
            expect(lineNumber).toBe(lineNumber);
        }
    });

    it("should return the correct file name and line number for anonymous functions", () => {
        const stackLine = "at filename:lineNumber:columnNumber";
        const attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
        if (attempt2) {
            const fileName = attempt2[1];
            const lineNumber = Number(attempt2[2]);
            expect(fileName).toBe("filename");
            expect(lineNumber).toBe(lineNumber);
        }
    });

    it("should return the correct file name and line number for Firefox style", () => {
        const stackLine = "function@filename:lineNumber";
        const attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
        if (attempt3) {
            const fileName = attempt3[1];
            const lineNumber = Number(attempt3[2]);
            expect(fileName).toBe("filename");
            expect(lineNumber).toBe(lineNumber);
        }
    });
});