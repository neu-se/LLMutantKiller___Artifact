// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("process type check in untrackRejection", () => {
    it("should verify process type check behavior in untrackRejection", (done) => {
        // This test specifically targets the mutation where:
        // Original: if (typeof process === "object" && typeof process.emit === "function")
        // Mutated:  if (typeof process === "" && typeof process.emit === "function")

        // Only run this test in Node.js environment
        if (typeof process === "undefined" || typeof process.emit !== "function") {
            done();
            return;
        }

        // Create a rejected promise
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.reject(new Error("test error"));

        // Verify the rejection was tracked
        expect(Q.getUnhandledReasons().length).toBe(1);

        // Handle the rejection
        promise.catch(() => {
            // After handling, check that the rejection was untracked
            // The untrackRejection function contains the mutated code
            setTimeout(() => {
                const reasons = Q.getUnhandledReasons();
                // In original code: should be 0 (properly untracked)
                // In mutated code: will be 1 (not untracked due to failed type check)
                if (reasons.length === 1) {
                    // This indicates the mutation is present
                    fail("Rejection was not untracked - mutation detected");
                } else {
                    // This indicates the original code is working
                    expect(reasons.length).toBe(0);
                }
                done();
            }, 100);
        });
    });
});