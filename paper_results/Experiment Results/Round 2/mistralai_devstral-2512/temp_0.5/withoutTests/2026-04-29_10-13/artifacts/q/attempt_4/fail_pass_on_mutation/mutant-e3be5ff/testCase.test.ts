const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q unhandled rejection tracking", () => {
    it("should track rejections when tracking is enabled", (done) => {
        // Ensure unhandled rejection tracking is enabled
        Q.resetUnhandledRejections();

        // Create a rejected promise that should be tracked
        const rejectedPromise = Q.reject(new Error("Test error"));

        // Give some time for the tracking to occur
        setTimeout(() => {
            // Check that the rejection was tracked
            const unhandledReasons = Q.getUnhandledReasons();
            expect(unhandledReasons.length).toBeGreaterThan(0);
            done();
        }, 10);
    });
});