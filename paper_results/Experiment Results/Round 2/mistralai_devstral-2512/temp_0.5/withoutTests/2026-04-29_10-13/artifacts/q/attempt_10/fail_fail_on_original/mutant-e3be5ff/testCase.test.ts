const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
    it("should not clear unhandled rejections when reset is called with tracking disabled", (done) => {
        // Enable tracking and add a rejection
        Q.resetUnhandledRejections();
        Q.reject(new Error("Test error"));

        // Wait for tracking to occur
        setTimeout(() => {
            // Verify it was tracked
            let initialReasons = Q.getUnhandledReasons();
            expect(initialReasons.length).toBeGreaterThan(0);

            // Disable tracking
            Q.stopUnhandledRejectionTracking();

            // Call reset while tracking is disabled
            Q.resetUnhandledRejections();

            // In original code: rejections should NOT be cleared when tracking is disabled
            // In mutated code: rejections WOULD be cleared
            setTimeout(() => {
                const finalReasons = Q.getUnhandledReasons();
                expect(finalReasons.length).toBeGreaterThan(0);
                done();
            }, 50);
        }, 50);
    }, 10000);
});