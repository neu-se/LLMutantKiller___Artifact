import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('q', () => {
    it('should correctly parse the stack line', () => {
        const stackLine = "    at functionName (filename:lineNumber:columnNumber)";
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["filename",  lineNumber]);
    });
});