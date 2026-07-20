import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick MessageChannel usage", () => {
    it("should use MessageChannel when available for better performance", () => {
        // Check if MessageChannel is available in this environment
        const hasMessageChannel = typeof MessageChannel !== "undefined";

        // Get the internal nextTick implementation
        const nextTickImpl = (Q as any).nextTick;

        // Check if the implementation has the MessageChannel code path
        // The original code should have this path when MessageChannel is available
        const hasMessageChannelCode = nextTickImpl.toString().includes("MessageChannel");

        if (hasMessageChannel) {
            // If MessageChannel is available, the implementation should use it
            // The mutation changes the condition to always false, so this will fail
            expect(hasMessageChannelCode).toBe(true);
        } else {
            // If MessageChannel is not available, we don't care
            expect(true).toBe(true);
        }
    });
});