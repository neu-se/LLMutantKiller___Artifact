import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick MessageChannel usage", () => {
    it("should use MessageChannel when available", () => {
        // This test checks the internal implementation detail of whether
        // MessageChannel is being used when available
        if (typeof MessageChannel === "undefined") {
            // Skip test if MessageChannel not available in this environment
            return;
        }

        // Store original nextTick implementation
        const originalNextTick = Q.nextTick;

        // Force re-initialization of nextTick
        delete (Q as any).nextTick;
        const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
        const reinitializedQ = qModule;

        // Check if the implementation is using MessageChannel
        const nextTickStr = reinitializedQ.nextTick.toString();
        const usesMessageChannel = nextTickStr.includes("MessageChannel");

        // Restore original
        Q.nextTick = originalNextTick;

        // The original code should use MessageChannel when available
        expect(usesMessageChannel).toBe(true);
    });
});