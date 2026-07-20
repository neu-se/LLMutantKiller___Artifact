import { Q } from '../../../../../../../../subject_repositories/q/q';

describe('Q', () => {
    it('should get the file name and line number from a stack line', () => {
        const stackLine = '    at Object.<anonymous> (q.js:123:45)';
        const fileNameAndLineNumber = Q.getFileNameAndLineNumber(stackLine);
        expect(fileNameAndLineNumber).not.toBeNull();
        expect(fileNameAndLineNumber[0]).toBe('q.js');
        expect(fileNameAndLineNumber[1]).toBe(123);
    });

    it('should not get the file name and line number from a stack line with a colon but no digits after it in the mutated code', () => {
        const stackLine = '    at Object.<anonymous> (q.js:123)';
        const fileNameAndLineNumber = Q.getFileNameAndLineNumber(stackLine);
        expect(fileNameAndLineNumber).toBeNull();
    });
});