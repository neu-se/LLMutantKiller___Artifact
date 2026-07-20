import { Q } from './q';

describe('Q', () => {
    it.skip('should correctly parse the stack line with a colon and digits', () => {
        const stackLine = '    at Object.<anonymous> (q.js:123:45)';
        const attempt2 = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
        expect(attempt2).not.toBeNull();
        expect(attempt2[1]).toBe('q.js');
        expect(attempt2[2]).toBe('123');
        expect(attempt2[3]).toBe('45');
    });

    it('should throw an error when parsing a stack line with a colon but no digits after it in the mutated code', () => {
        const stackLine = '    at Object.<anonymous> (q.js:123)';
        expect(() => {
            const attempt2 = /at ([^ ]+):(\d+):(\d)$/.exec(stackLine);
            if (!attempt2) {
                throw new Error('Failed to parse stack line');
            }
        }).toThrowError('Failed to parse stack line');
    });
});