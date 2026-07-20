import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection stops tracking after stopUnhandledRejectionTracking", () => {
    it("should not track new rejections after stopUnhandledRejectionTracking is called", () => {
        // Reset to a clean state first
        Q.resetUnhandledRejections();
        
        // Verify tracking works before stopping
        Q.reject("before stopping");
        expect(Q.getUnhandledReasons().length).toBe(1);
        
        // Stop tracking
        Q.stopUnhandledRejectionTracking();
        
        // After stopping, new rejections should NOT be tracked
        Q.reject("after stopping");
        
        // With the original code: trackRejection returns early when !trackUnhandledRejections
        // so "after stopping" should NOT appear in unhandled reasons
        // With the mutated code: if (false) never triggers the return, so rejection IS tracked
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});