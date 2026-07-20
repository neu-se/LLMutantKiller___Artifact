const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
    it("should not clear unhandled rejections when tracking is disabled", (done) => {
        // First enable tracking and add a rejection
        Q.resetUnhandledRejections();
        Q.reject(new Error("Test error"));

        // Disable tracking
        Q.stopUnhandledRejectionTracking();

        // Try to reset while tracking is disabled
        Q.resetUnhandledRejections();

        // In original code, rejections should NOT be cleared when tracking is disabled
        // In mutated code, they WOULD be cleared
        setTimeout(() => {
            const unhandledReasons = Q.getUnhandledReasons();
            expect(unhandledReasons.length).toBeGreaterThan(0);
            done();
        }, 50);
    });
});