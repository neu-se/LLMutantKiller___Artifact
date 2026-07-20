import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should not track rejections when tracking is disabled", () => {
        // Disable unhandled rejection tracking
        Q.stopUnhandledRejectionTracking();

        // Create a rejected promise
        const rejectedPromise = Q.reject(new Error("test error"));

        // Verify that the rejection is not tracked
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});