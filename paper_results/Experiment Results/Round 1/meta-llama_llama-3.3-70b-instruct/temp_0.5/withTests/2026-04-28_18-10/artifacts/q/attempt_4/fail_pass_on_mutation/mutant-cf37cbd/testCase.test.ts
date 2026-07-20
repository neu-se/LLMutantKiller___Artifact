import { Q } from './q';

describe('Q', () => {
    it.skip('should correctly parse the stack line with a colon, a digit, and another digit', () => {
        const stackLine = '    at Object.<anonymous> (q.js:123:45)';
        const attempt2 = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
        expect(attempt2).not.toBeNull();
        expect(attempt2[1]).toBe('q.js');
        expect(attempt2[2]).toBe('123');
        expect(attempt2[3]).toBe('45');
    });

    it('should not parse the stack line with a colon and a digit in the mutated code', () => {
        const stackLine = '    at Object.<anonymous> (q.js:123)';
        const attempt2 = /at ([^ ]+):(\d+):(\d+)$/.exec(stackLine);
        expect(attempt2).toBeNull();
    });
});