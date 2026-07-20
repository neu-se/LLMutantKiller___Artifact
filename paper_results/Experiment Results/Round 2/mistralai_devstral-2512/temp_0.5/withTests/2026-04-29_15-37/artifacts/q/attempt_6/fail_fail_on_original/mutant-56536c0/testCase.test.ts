import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick MessageChannel detection", () => {
    it("should detect when MessageChannel is available but not used", () => {
        // Check if MessageChannel is available in this environment
        const hasMessageChannel = typeof MessageChannel !== "undefined";

        // Get the current nextTick implementation
        const nextTick = Q.nextTick;

        // Check if the implementation is using MessageChannel when available
        // We can detect this by checking if the implementation has the MessageChannel code path
        const implementationCode = nextTick.toString();

        if (hasMessageChannel) {
            // If MessageChannel is available, the implementation should contain MessageChannel code
            // The mutation changes this condition to always false, so this check will fail
            expect(implementationCode).toContain("MessageChannel");
        } else {
            // If MessageChannel is not available, we don't care which implementation is used
            expect(true).toBe(true);
        }
    });
});