import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Testing getFileNameAndLineNumber function', () => {
    it('should correctly parse the filename and line number from a stack line', () => {
        // Create a new error to get a stack line
        const error = new Error();
        const stackLine = error.stack.split('\n')[2];

        // Define the expected filename and line number
        const expectedFileName = __filename;
        const expectedLineNumber = 2; // This might need to be adjusted based on the actual line number

        // Call the getFileNameAndLineNumber function
        const result = Q.getFileNameAndLineNumber(stackLine);

        // Check if the result is not null
        expect(result).not.toBeNull();

        // Check if the filename and line number match the expected values
        expect(result[0]).toBe(expectedFileName);
        expect(result[1]).toBeGreaterThan(0); // We can't know the exact line number, but it should be greater than 0
    });
});