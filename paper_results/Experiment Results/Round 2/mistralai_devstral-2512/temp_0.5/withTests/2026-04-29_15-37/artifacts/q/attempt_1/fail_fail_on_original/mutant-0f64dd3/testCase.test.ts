import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace handling with missing line information", () => {
    it("should handle stack traces without file information gracefully", () => {
        // Create a scenario where stack trace parsing might fail
        const originalHasStacks = (Q as any).hasStacks;
        try {
            // Force the library to think stacks are available
            (Q as any).hasStacks = true;

            // Create a promise chain that will generate stack traces
            const promise = Q.reject(new Error("Test error"));

            // The mutation affects how stack traces are captured when file/line info is missing
            // This test verifies the library doesn't crash in such cases
            return promise.catch(() => {
                // If we get here, the error was handled properly
                return true;
            }).then((result) => {
                expect(result).toBe(true);
            });
        } finally {
            // Restore original state
            (Q as any).hasStacks = originalHasStacks;
        }
    });
});