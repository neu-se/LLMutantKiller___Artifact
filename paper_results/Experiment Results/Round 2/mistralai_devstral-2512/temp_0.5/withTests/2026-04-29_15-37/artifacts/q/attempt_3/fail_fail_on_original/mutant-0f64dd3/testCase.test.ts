import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace filtering with missing line information", () => {
    it("should correctly filter stack traces when file information is missing", () => {
        // Create a promise chain that will generate stack traces
        const promise = Q.reject(new Error("Test error"));

        // The mutation affects the captureLine function which is used for filtering stack traces
        // We need to verify that the stack trace filtering works correctly
        return promise.catch((error) => {
            // Verify the error has a stack trace
            expect(error.stack).toBeDefined();

            // Create a scenario where we need to filter stack traces
            // This will trigger the captureLine function
            const filteredStack = (Q as any).filterStackString(error.stack);

            // The filtered stack should not be empty
            expect(filteredStack.length).toBeGreaterThan(0);

            // The mutation would cause incorrect filtering when file info is missing
            // This assertion verifies the filtering worked correctly
            expect(filteredStack).not.toContain("From previous event:");

            return true;
        });
    });
});