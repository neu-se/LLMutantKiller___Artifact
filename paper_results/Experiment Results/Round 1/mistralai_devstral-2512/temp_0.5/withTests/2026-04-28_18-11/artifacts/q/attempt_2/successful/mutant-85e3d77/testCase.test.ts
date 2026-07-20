import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should not track rejections when tracking is disabled", () => {
        // Disable unhandled rejection tracking
        Q.stopUnhandledRejectionTracking();

        // Create and reject a promise
        const error = new Error("test error");
        Q.reject(error);

        // Verify that no rejections are tracked
        expect(Q.getUnhandledReasons()).toEqual([]);
    });
});