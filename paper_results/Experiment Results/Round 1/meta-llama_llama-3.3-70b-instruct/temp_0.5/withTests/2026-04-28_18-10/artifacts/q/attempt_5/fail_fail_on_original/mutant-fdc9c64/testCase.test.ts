import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const fileName = "q.js";
        const lineNumber = Q.qStartingLine - 1;

        // The original function returns false if the line number is less than qStartingLine
        // The mutation changes the condition to fileName === qFileName && lineNumber >= qStartingLine || lineNumber <= qEndingLine
        // This means that the function should return true for any line number
        expect(isInternalFrame(fileName, lineNumber)).toBe(false);
    });
});

// Helper function to check if a file name and line number is an internal frame
function isInternalFrame(fileName: string, lineNumber: number) {
    // The original function returns true if the file name matches qFileName and the line number is within the range of qStartingLine and qEndingLine
    return fileName === Q.qFileName && lineNumber >= Q.qStartingLine && lineNumber <= Q.qEndingLine;
}