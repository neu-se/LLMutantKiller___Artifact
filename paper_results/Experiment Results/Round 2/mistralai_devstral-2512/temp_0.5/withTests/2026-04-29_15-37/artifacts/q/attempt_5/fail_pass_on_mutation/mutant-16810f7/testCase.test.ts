// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should properly track and untrack rejections in Node.js environment", (done) => {
        // Setup: Ensure we're in a Node.js environment with process.emit
        if (typeof process === "undefined" || typeof process.emit !== "function") {
            done();
            return;
        }

        // Create a rejected promise
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.reject(new Error("test error"));

        // Check initial state
        expect(Q.getUnhandledReasons().length).toBe(1);

        // Handle the rejection
        promise.catch(() => {
            // After handling, check that the rejection was untracked
            // This test specifically checks the behavior of untrackRejection
            // which contains the mutated code
            setTimeout(() => {
                const reasons = Q.getUnhandledReasons();
                expect(reasons.length).toBe(0);
                done();
            }, 100);
        });
    });
});