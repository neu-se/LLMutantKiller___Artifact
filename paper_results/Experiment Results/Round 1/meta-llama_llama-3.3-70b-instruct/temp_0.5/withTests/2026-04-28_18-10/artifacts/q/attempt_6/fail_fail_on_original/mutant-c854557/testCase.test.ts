import { Q } from "../../../q.js";

describe('Testing getFileNameAndLineNumber function', () => {
    it('should correctly parse the filename and line number from a stack line', () => {
        const error = new Error();
        const stackLine = error.stack.split('\n')[2];
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).not.toBeNull();
        expect(result).toHaveProperty('length', 2);
        expect(typeof result[1]).toBe('number');
        expect(result[1]).toBeGreaterThan(0);
        // The mutation changes the regular expression in getFileNameAndLineNumber to 
        // /at ([^ ]+):(\d):(?:\d+)$/.exec(stackLine) from 
        // /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine). 
        // This will cause the function to return incorrect results when the line number is more than one digit.
        // So, we check if the line number is correctly parsed.
        expect(result[1].toString().length).toBeGreaterThan(1);
    });
});