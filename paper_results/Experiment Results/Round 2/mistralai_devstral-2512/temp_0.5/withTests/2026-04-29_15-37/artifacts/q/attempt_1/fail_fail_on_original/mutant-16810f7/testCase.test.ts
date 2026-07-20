// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should emit 'rejectionHandled' event when a rejected promise is handled", (done) => {
        // Setup: Ensure we're in a Node.js environment with process.emit
        if (typeof process === "undefined" || typeof process.emit !== "function") {
            done();
            return;
        }

        // Create a rejected promise and handle it after some time
        const deferred = Q.defer();
        const promise = deferred.promise;

        // Reject the promise
        deferred.reject(new Error("test error"));

        // Listen for the 'rejectionHandled' event
        process.once("rejectionHandled", (reason, p) => {
            expect(reason).toContain("test error");
            expect(p).toBe(promise);
            done();
        });

        // Handle the rejection after a short delay to allow the event to be tracked
        setTimeout(() => {
            promise.catch(() => {});
        }, 10);
    });
});