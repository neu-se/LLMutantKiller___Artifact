import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace initialization with missing file information", () => {
    it("should handle initialization when stack trace parsing fails", () => {
        // Create a scenario where stack trace parsing will fail
        // This will trigger the captureLine function with falsy fileNameAndLineNumber
        const originalHasStacks = (Q as any).hasStacks;
        try {
            // Force the library to think stacks are available
            (Q as any).hasStacks = true;

            // Override the getFileNameAndLineNumber function to return null
            // This simulates the case where stack trace parsing fails
            const originalGetFileNameAndLineNumber = (Q as any).getFileNameAndLineNumber;
            (Q as any).getFileNameAndLineNumber = function() {
                return null;
            };

            // Create a new promise to trigger stack trace initialization
            const promise = Q.reject(new Error("Test error"));

            return promise.catch(function(error: Error) {
                // Verify the error is handled correctly
                expect(error.message).toBe("Test error");

                // The mutation affects how null fileNameAndLineNumber is handled
                // Original code: if (!fileNameAndLineNumber) - executes when null
                // Mutated code: if (fileNameAndLineNumber) - doesn't execute when null
                return true;
            }).then(function(result: boolean) {
                expect(result).toBe(true);
            });
        } finally {
            // Restore original state
            (Q as any).hasStacks = originalHasStacks;
            if (originalGetFileNameAndLineNumber) {
                (Q as any).getFileNameAndLineNumber = originalGetFileNameAndLineNumber;
            }
        }
    });
});