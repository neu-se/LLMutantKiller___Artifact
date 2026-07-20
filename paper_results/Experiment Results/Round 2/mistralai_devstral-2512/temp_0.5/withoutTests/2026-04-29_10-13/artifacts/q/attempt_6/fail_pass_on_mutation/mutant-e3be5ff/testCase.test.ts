const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
    it("should clear unhandled rejections when reset is called with tracking disabled", (done) => {
        // Disable tracking
        Q.stopUnhandledRejectionTracking();

        // Add some unhandled rejections while tracking is disabled
        Q.reject(new Error("Test error 1"));
        Q.reject(new Error("Test error 2"));

        // Reset while tracking is still disabled
        Q.resetUnhandledRejections();

        // Check that rejections were cleared (mutated behavior)
        setTimeout(() => {
            const unhandledReasons = Q.getUnhandledReasons();
            expect(unhandledReasons.length).toBe(0);
            done();
        }, 50);
    });
});