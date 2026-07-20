import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly handle getFileNameAndLineNumber function', () => {
        const getFileNameAndLineNumber = Q.getFileNameAndLineNumber;
        const stackLine = 'at Q (filename:123:456)';
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(['filename', 123]);
    });
});