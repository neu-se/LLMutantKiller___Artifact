import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick MessageChannel fallback", () => {
    it("should properly handle MessageChannel availability", () => {
        // Store original MessageChannel
        const originalMessageChannel = (global as any).MessageChannel;

        try {
            // Temporarily make MessageChannel unavailable
            (global as any).MessageChannel = undefined;

            // Force re-initialization of Q
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
            const Q_noMC = require("../../../../../../../../../../../subject_repositories/q/q.js");

            // Get the nextTick implementation
            const nextTick = Q_noMC.nextTick;

            // Check if it's using the setTimeout fallback
            const isUsingSetTimeout = nextTick.toString().includes("setTimeout(flush, 0)");

            // When MessageChannel is unavailable, it should use setTimeout
            expect(isUsingSetTimeout).toBe(true);

        } finally {
            // Restore original MessageChannel
            (global as any).MessageChannel = originalMessageChannel;
        }
    });
});