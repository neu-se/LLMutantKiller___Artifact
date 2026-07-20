import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle getFileNameAndLineNumber for Firefox style stack lines', () => {
        const error = new Error();
        error.stack = "function@filename:lineNumber";
        const result = getFileNameAndLineNumber(error.stack.split("\n")[0]);
        expect(result).toEqual(["filename", 1]);
    });
});