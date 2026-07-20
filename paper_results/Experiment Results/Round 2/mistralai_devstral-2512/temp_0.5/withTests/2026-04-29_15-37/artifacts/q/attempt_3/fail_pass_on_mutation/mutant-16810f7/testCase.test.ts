// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should track and untrack rejections properly in Node.js environment", (done) => {
        // Setup: Ensure we're in a Node.js environment with process.emit
        if (typeof process === "undefined" || typeof process.emit !== "function") {
            done();
            return;
        }

        // Create a rejected promise
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.reject(new Error("test error"));

        // Check that the rejection was tracked
        expect(Q.getUnhandledReasons().length).toBeGreaterThan(0);

        // Handle the rejection
        promise.catch(() => {
            // After handling, the rejection should be untracked
            // This relies on the untrackRejection function being called
            setTimeout(() => {
                expect(Q.getUnhandledReasons().length).toBe(0);
                done();
            }, 50);
        });
    });
});