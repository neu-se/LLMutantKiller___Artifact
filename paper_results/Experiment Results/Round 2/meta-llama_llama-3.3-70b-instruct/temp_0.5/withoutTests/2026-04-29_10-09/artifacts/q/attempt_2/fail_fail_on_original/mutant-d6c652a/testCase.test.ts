import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should capture the line number correctly', () => {
        // Get the line number of the current function
        const lineNumber = (new Error()).stack.split('\n')[2].split(':')[1];

        // Create a new error to capture the line number
        const error = new Error();
        const lines = error.stack.split('\n');
        const firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        const fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            throw new Error('Failed to get file name and line number');
        }

        // Get the captured line number
        const capturedLineNumber = fileNameAndLineNumber[1];

        // Check if the captured line number is correct
        expect(capturedLineNumber).toBeGreaterThan(lineNumber);
    });
});