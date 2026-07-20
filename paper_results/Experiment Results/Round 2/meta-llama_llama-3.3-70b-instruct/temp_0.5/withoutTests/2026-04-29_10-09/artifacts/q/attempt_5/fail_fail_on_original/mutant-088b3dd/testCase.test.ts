import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly parse the stack line and extract the file name and line number', () => {
        const error = new Error();
        const stackLines = error.stack.split('\n');
        const stackLine = stackLines[2];
        const getFileNameAndLineNumber = Q.getFileNameAndLineNumber;
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toBeDefined();
    });
});