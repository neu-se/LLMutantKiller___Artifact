// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should emit 'unhandledRejection' and 'rejectionHandled' events in Node.js environment", (done) => {
        // Setup: Ensure we're in a Node.js environment with process.emit
        if (typeof process === "undefined" || typeof process.emit !== "function") {
            done();
            return;
        }

        // Create a rejected promise
        const deferred = Q.defer();
        const promise = deferred.promise;
        const error = new Error("test error");

        // Track event emissions
        let unhandledEmitted = false;
        let handledEmitted = false;

        process.once("unhandledRejection", (reason, p) => {
            unhandledEmitted = true;
            expect(reason).toBe(error);
            expect(p).toBe(promise);
        });

        process.once("rejectionHandled", (reason, p) => {
            handledEmitted = true;
            expect(reason).toContain("test error");
            expect(p).toBe(promise);

            // Verify both events were emitted
            expect(unhandledEmitted).toBe(true);
            expect(handledEmitted).toBe(true);
            done();
        });

        // Reject the promise
        deferred.reject(error);

        // Handle the rejection after a short delay
        setTimeout(() => {
            promise.catch(() => {});
        }, 10);
    });
});