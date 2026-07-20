const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
    it("should preserve unhandled rejections when reset is called with tracking disabled", (done) => {
        // Enable tracking and add a rejection
        Q.resetUnhandledRejections();
        const rejectedPromise = Q.reject(new Error("Test error"));

        // Wait for the rejection to be tracked
        setTimeout(() => {
            // Verify it was tracked
            let initialReasons = Q.getUnhandledReasons();
            expect(initialReasons.length).toBeGreaterThan(0);

            // Now disable tracking
            Q.stopUnhandledRejectionTracking();

            // Call reset while tracking is disabled
            Q.resetUnhandledRejections();

            // In original code: rejections should be preserved when tracking is disabled
            // In mutated code: rejections would be cleared
            setTimeout(() => {
                const finalReasons = Q.getUnhandledReasons();
                expect(finalReasons.length).toBeGreaterThan(0);
                done();
            }, 50);
        }, 50);
    }, 10000);
});