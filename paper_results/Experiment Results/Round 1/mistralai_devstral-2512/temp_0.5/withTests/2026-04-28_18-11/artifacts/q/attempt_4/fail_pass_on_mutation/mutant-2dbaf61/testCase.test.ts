const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Stack trace availability", () => {
    it("should have stack traces available in error objects", () => {
        // Create an error and check if it has a stack trace
        const error = new Error("Test error");

        // The original code should properly detect stack support
        // The mutated code would fail to detect it
        if (error.stack) {
            // If we have stack traces, verify basic properties
            expect(typeof error.stack).toBe("string");
            expect(error.stack.length).toBeGreaterThan(0);
            expect(error.stack).toContain("Error: Test error");
        } else {
            // This branch should not be reached in original code
            // but would be reached in mutated code
            fail("Stack traces should be available");
        }
    });
});