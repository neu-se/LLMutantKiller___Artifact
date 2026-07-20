import { Q } from "./q.js";

describe("Q library stack trace capture", () => {
    it("should properly capture stack traces when available", () => {
        // This test verifies that the captureLine function correctly handles
        // environments with stack traces by checking if Q can properly track
        // promise creation locations when long stack support is enabled
        const originalHasStacks = Q.longStackSupport;
        Q.longStackSupport = true;

        let capturedStack: string | undefined;

        try {
            // Create a rejected promise to trigger stack capture
            const promise = Q.reject(new Error("Test error"));

            // Force promise inspection to ensure stack is captured
            const inspection = promise.inspect();
            expect(inspection.state).toBe("rejected");

            // The stack should be captured if hasStacks is true
            capturedStack = (promise as any).stack;
            expect(typeof capturedStack).toBe("string");
            expect(capturedStack.length).toBeGreaterThan(0);
        } finally {
            Q.longStackSupport = originalHasStacks;
        }
    });
});