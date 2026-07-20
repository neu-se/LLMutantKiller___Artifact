import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("resetUnhandledRejections re-enables tracking", () => {
    it("should re-enable rejection tracking after stopUnhandledRejectionTracking is called and then resetUnhandledRejections is called", () => {
        // First, stop tracking (sets trackUnhandledRejections = false)
        Q.stopUnhandledRejectionTracking();

        // Verify tracking is stopped - a rejection should not be tracked
        Q.reject("should not be tracked");
        expect(Q.getUnhandledReasons().length).toEqual(0);

        // Now reset - in original code this re-enables tracking
        // In mutated code, tracking remains disabled
        Q.resetUnhandledRejections();

        // Create a rejection - should be tracked in original, not in mutated
        Q.reject("should be tracked after reset");

        // Original: tracking was re-enabled by resetUnhandledRejections, so this should be 1
        // Mutated: tracking is still disabled, so this would be 0
        expect(Q.getUnhandledReasons().length).toEqual(1);

        // Clean up
        Q.resetUnhandledRejections();
    });
});