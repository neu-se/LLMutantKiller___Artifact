import { Q } from './q';

describe('Q', () => {
    it('should correctly parse the stack line with a colon and digits', () => {
        const stackLine = '    at Object.<anonymous> (q.js:123:45)';
        const attempt2 = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
        expect(attempt2).not.toBeNull();
        expect(attempt2[1]).toBe('q.js');
        expect(attempt2[2]).toBe('123');
        expect(attempt2[3]).toBe('45');
    });

    it('should correctly parse the stack line with a colon, a digit, and another digit using the getFileNameAndLineNumber function', () => {
        const stackLine = '    at Object.<anonymous> (q.js:123:45)';
        const fileNameAndLineNumber = Q.getFileNameAndLineNumber(stackLine);
        expect(fileNameAndLineNumber).not.toBeNull();
        expect(fileNameAndLineNumber[0]).toBe('q.js');
        expect(fileNameAndLineNumber[1]).toBe(123);
    });
});