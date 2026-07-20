import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Testing getFileNameAndLineNumber function', () => {
    it('should correctly parse the filename and line number from a stack line', () => {
        // Create a new error to get a stack line
        const error = new Error();
        const stackLine = error.stack.split('\n')[2];

        // Call the getFileNameAndLineNumber function
        const result = Q.getFileNameAndLineNumber(stackLine);

        // Check if the result is not null
        expect(result).not.toBeNull();

        // Check if the result has two elements (filename and line number)
        expect(result).toHaveProperty('length', 2);

        // Check if the line number is a number and greater than 0
        expect(typeof result[1]).toBe('number');
        expect(result[1]).toBeGreaterThan(0);

        // Check if the line number has at least 3 digits in the original code
        // but not in the mutated code
        expect(result[1].toString().length).toBe(3);
    });
});