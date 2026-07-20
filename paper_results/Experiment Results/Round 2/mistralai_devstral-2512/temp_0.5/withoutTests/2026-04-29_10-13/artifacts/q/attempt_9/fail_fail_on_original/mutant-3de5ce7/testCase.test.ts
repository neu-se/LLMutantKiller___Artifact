// Test case to detect the mutation in the stack trace parsing regex
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace parsing", () => {
    it("should correctly parse Firefox-style stack traces with line numbers", () => {
        // Create a mock stack trace that matches Firefox format
        const mockError = new Error("Test error");
        mockError.stack = "Error: Test error\n@http://example.com:42:21\n@http://example.com:45:10";

        // Test the internal stack filtering function
        // The mutation changes \d+ to \D+ which breaks line number parsing
        const filteredStack = Q._filterStackString(mockError.stack);

        // The filtered stack should still contain line numbers
        // This will fail on mutated code because it can't parse line numbers properly
        expect(filteredStack).toContain(":42:");
        expect(filteredStack).toContain(":45:");

        // Also test the getFileNameAndLineNumber function directly
        const testLine = "function@file.js:42";
        const result = Q._getFileNameAndLineNumber(testLine);

        // Original code should parse this correctly
        expect(result).not.toBeNull();
        if (result) {
            expect(result[0]).toBe("file.js");
            expect(result[1]).toBe(42);
        }
    });
});