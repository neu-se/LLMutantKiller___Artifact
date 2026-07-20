const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
    it("should clear unhandled rejections when reset is called with tracking enabled", (done) => {
        // Enable tracking
        Q.resetUnhandledRejections();

        // Add a rejection
        Q.reject(new Error("Test error"));

        // Wait for tracking to occur
        setTimeout(() => {
            // Verify it was tracked
            let initialReasons = Q.getUnhandledReasons();
            expect(initialReasons.length).toBeGreaterThan(0);

            // Reset while tracking is still enabled
            Q.resetUnhandledRejections();

            // Check that rejections were cleared
            setTimeout(() => {
                const finalReasons = Q.getUnhandledReasons();
                expect(finalReasons.length).toBe(0);
                done();
            }, 50);
        }, 50);
    }, 10000);
});