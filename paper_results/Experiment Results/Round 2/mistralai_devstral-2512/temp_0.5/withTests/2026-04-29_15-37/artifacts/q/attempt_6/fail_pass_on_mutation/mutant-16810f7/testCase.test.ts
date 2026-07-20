// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("process type check in untrackRejection", () => {
    it("should correctly identify Node.js environment when untracking rejections", (done) => {
        // This test specifically targets the mutation where:
        // Original: if (typeof process === "object" && typeof process.emit === "function")
        // Mutated:  if (typeof process === "" && typeof process.emit === "function")

        // Create a rejected promise
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.reject(new Error("test error"));

        // Verify the rejection was tracked
        expect(Q.getUnhandledReasons().length).toBe(1);

        // Handle the rejection
        promise.catch(() => {
            // After handling, the rejection should be untracked
            // The untrackRejection function contains the mutated code
            setTimeout(() => {
                // In the original code, this should work correctly in Node.js
                // In the mutated code, the type check will fail and untracking won't happen
                const reasons = Q.getUnhandledReasons();
                if (typeof process === "object" && typeof process.emit === "function") {
                    // In original code, this should be 0 (untracked)
                    // In mutated code, this will be 1 (still tracked)
                    expect(reasons.length).toBe(0);
                }
                done();
            }, 100);
        });
    });
});