// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("process type check in untrackRejection", () => {
    it("should properly handle process type check when untracking rejections", (done) => {
        // This test specifically targets the mutation where:
        // Original: if (typeof process === "object" && typeof process.emit === "function")
        // Mutated:  if (typeof process === "" && typeof process.emit === "function")

        // Only run this test in Node.js environment
        if (typeof process === "undefined" || typeof process.emit !== "function") {
            done();
            return;
        }

        // Create multiple rejected promises to test the untracking behavior
        const deferred1 = Q.defer();
        const deferred2 = Q.defer();
        const promise1 = deferred1.promise;
        const promise2 = deferred2.promise;

        // Reject both promises
        deferred1.reject(new Error("error1"));
        deferred2.reject(new Error("error2"));

        // Verify both rejections were tracked
        expect(Q.getUnhandledReasons().length).toBe(2);

        // Handle the first rejection
        promise1.catch(() => {
            // After handling first promise, check tracking
            setTimeout(() => {
                const reasonsAfterFirst = Q.getUnhandledReasons();
                // In original code: should be 1 (one untracked)
                // In mutated code: will be 2 (none untracked)
                expect(reasonsAfterFirst.length).toBe(1);

                // Handle the second rejection
                promise2.catch(() => {
                    setTimeout(() => {
                        const reasonsAfterSecond = Q.getUnhandledReasons();
                        // In original code: should be 0 (both untracked)
                        // In mutated code: will be 2 (none untracked)
                        expect(reasonsAfterSecond.length).toBe(0);
                        done();
                    }, 100);
                });
            }, 100);
        });
    });
});