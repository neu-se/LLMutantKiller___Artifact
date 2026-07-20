// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("process type check in untrackRejection", () => {
    it("should emit rejectionHandled event when process is properly detected", (done) => {
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
        const testError = new Error("test error");

        // Track if rejectionHandled event was emitted
        let rejectionHandledEmitted = false;

        process.once("rejectionHandled", (reason: string, p: any) => {
            rejectionHandledEmitted = true;
            expect(reason).toContain("test error");
            expect(p).toBe(promise);
        });

        // Reject the promise
        deferred.reject(testError);

        // Handle the rejection after a short delay
        setTimeout(() => {
            promise.catch(() => {
                // In original code, rejectionHandled should have been emitted
                // In mutated code, the condition fails so it won't be emitted
                setTimeout(() => {
                    expect(rejectionHandledEmitted).toBe(true);
                    done();
                }, 50);
            });
        }, 10);
    });
});