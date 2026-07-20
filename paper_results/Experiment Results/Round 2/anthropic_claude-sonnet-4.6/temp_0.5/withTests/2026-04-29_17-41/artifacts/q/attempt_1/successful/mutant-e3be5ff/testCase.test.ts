import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("resetUnhandledRejections re-enables tracking after stopUnhandledRejectionTracking", () => {
    it("should track rejections again after resetUnhandledRejections is called following stopUnhandledRejectionTracking", () => {
        // Stop tracking - this sets trackUnhandledRejections to false
        Q.stopUnhandledRejectionTracking();

        // Verify tracking is stopped
        Q.reject("reason while stopped");
        expect(Q.getUnhandledReasons().length).toEqual(0);

        // resetUnhandledRejections should re-enable tracking
        // In original: if (!trackUnhandledRejections) { trackUnhandledRejections = true; }
        // In mutated:  if (trackUnhandledRejections) { ... } - does NOT re-enable
        Q.resetUnhandledRejections();

        // Now reject something - it should be tracked if tracking was re-enabled
        Q.reject("reason after reset");

        // In original code: tracking is re-enabled, so this rejection is tracked
        // In mutated code: tracking is still disabled, so getUnhandledReasons() returns []
        expect(Q.getUnhandledReasons().length).toEqual(1);

        // Cleanup
        Q.resetUnhandledRejections();
    });
});