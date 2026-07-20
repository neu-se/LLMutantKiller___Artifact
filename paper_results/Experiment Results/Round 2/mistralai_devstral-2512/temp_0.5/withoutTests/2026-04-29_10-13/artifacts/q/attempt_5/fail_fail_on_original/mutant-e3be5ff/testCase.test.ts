const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
    it("should not clear unhandled rejections when tracking is disabled", (done) => {
        // Enable tracking and add a rejection
        Q.resetUnhandledRejections();
        const rejectedPromise = Q.reject(new Error("Test error"));

        // Disable tracking
        Q.stopUnhandledRejectionTracking();

        // Try to reset while tracking is disabled
        Q.resetUnhandledRejections();

        // Check that rejections were not cleared (original behavior)
        setTimeout(() => {
            const unhandledReasons = Q.getUnhandledReasons();
            expect(unhandledReasons.length).toBeGreaterThan(0);
            done();
        }, 10);
    });
});