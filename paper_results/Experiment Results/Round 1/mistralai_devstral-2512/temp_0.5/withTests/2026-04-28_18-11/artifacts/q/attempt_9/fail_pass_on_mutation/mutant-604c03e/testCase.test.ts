const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
    it("should not untrack unhandled rejections that were never tracked", async () => {
        // Reset unhandled rejections tracking
        Q.resetUnhandledRejections();

        // Create a promise that will be rejected but never tracked
        // (because we'll handle it before the tracking can occur)
        const deferred = Q.defer();
        const promise = deferred.promise;

        // Immediately handle the rejection
        const handled = promise.catch(() => {});

        // Now reject the promise
        deferred.reject(new Error("test error"));

        // Wait for the handling to complete
        await handled;

        // The rejection should never have been tracked in the first place
        // because it was handled before tracking could occur
        expect(Q.getUnhandledReasons().length).toBe(0);

        // Now create a rejection that will be tracked
        const trackedPromise = Q.reject(new Error("tracked error"));
        expect(Q.getUnhandledReasons().length).toBe(1);

        // Handle it
        await trackedPromise.catch(() => {});
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});