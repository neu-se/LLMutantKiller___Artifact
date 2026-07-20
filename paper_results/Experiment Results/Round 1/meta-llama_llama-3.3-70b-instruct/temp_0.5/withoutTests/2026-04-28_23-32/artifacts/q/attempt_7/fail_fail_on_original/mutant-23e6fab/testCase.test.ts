// getFileNameAndLineNumber.test.js
import { getFileNameAndLineNumber } from './getFileNameAndLineNumber.js';

describe('getFileNameAndLineNumber', () => {
    it('should correctly handle Firefox style stack lines', () => {
        const stackLine = "function@filename:123";
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toEqual(["filename", 123]);
    });

    it('should correctly handle invalid stack lines', () => {
        const stackLine = "function";
        const result = getFileNameAndLineNumber(stackLine);
        expect(result).toBeNull();
    });
});