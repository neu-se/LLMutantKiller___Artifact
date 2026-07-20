import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly parse stack lines', () => {
        const stackLine = "at functionName (filename:lineNumber:columnNumber)";
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["filename", 1]);
    });
});