const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
    it("should correctly untrack a handled rejection", async () => {
        // Reset unhandled rejections tracking
        Q.resetUnhandledRejections();

        // Create a rejected promise
        const rejectedPromise = Q.reject(new Error("test error"));

        // Verify the rejection is tracked
        expect(Q.getUnhandledReasons().length).toBe(1);

        // Handle the rejection
        await rejectedPromise.catch(() => {});

        // The rejection should be untracked
        expect(Q.getUnhandledReasons().length).toBe(0);

        // Create another rejected promise to verify tracking still works
        const rejectedPromise2 = Q.reject(new Error("test error 2"));
        expect(Q.getUnhandledReasons().length).toBe(1);
    });
});