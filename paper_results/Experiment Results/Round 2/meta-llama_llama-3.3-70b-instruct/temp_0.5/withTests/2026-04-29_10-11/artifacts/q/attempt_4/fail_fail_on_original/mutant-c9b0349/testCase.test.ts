import { Q } from './q';

describe("Q library", () => {
    it("should filter stack traces correctly", () => {
        // Create a stack line
        const stackLine = "    at Q (/path/to/q.js:1234:12)";
        const fileNameAndLineNumber = Q.getFileNameAndLineNumber(stackLine);

        // Check if the file name and line number are correctly extracted
        expect(fileNameAndLineNumber).not.toBeNull();
        expect(fileNameAndLineNumber[0]).toBe("/path/to/q.js");
        expect(fileNameAndLineNumber[1]).toBe(1234);

        // Check if the isInternalFrame function correctly identifies internal frames
        const result = Q.isInternalFrame(stackLine);
        expect(result).toBe(true);
    });
});