import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Testing getFileNameAndLineNumber function', () => {
    it('should correctly parse the filename and line number from a stack line', () => {
        const error = new Error();
        const stackLine = error.stack.split('\n')[2];
        const result = Q.getFileNameAndLineNumber(stackLine);
        expect(result).not.toBeNull();
        expect(result).toHaveProperty('length', 2);
        expect(typeof result[1]).toBe('number');
        expect(result[1]).toBeGreaterThan(0);
        expect(result[1].toString().length).toBeGreaterThan(1);
    });
});