import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q', () => {
    it('should correctly extract filename and line number from a stack line', () => {
        const stackLine = 'at Q (filename:123:456)';
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(['filename', 123]);
    });
});