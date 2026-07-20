import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should filter out internal frames from stack traces", () => {
        // Create a new error to test the stack trace filtering
        const error = new Error("Test error");

        // Get the current stack trace
        const stack = error.stack;

        // Split the stack trace into individual lines
        const lines = stack.split("\n");

        // Get the file name and line number of the current file
        const fileName = __filename;
        const lineNumber = __line;

        // Check if the first line of the stack trace is an internal frame
        const isInternalFrame = lines[0].includes(fileName) && lines[0].includes(lineNumber.toString());

        // If the first line is an internal frame, it should be filtered out
        if (isInternalFrame) {
            const filteredStack = Q.filterStackString(stack);
            expect(filteredStack).not.toContain(lines[0]);
        } else {
            // If the first line is not an internal frame, the stack trace should remain unchanged
            const filteredStack = Q.filterStackString(stack);
            expect(filteredStack).toBe(stack);
        }
    });
});