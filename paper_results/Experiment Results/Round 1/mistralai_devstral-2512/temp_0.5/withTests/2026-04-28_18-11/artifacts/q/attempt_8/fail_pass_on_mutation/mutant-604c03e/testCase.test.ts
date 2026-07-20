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

        // Create another rejected promise and handle it immediately
        const rejectedPromise2 = Q.reject(new Error("test error 2"));
        await rejectedPromise2.catch(() => {});

        // This should also be untracked
        expect(Q.getUnhandledReasons().length).toBe(0);

        // Create a third rejected promise and don't handle it
        const rejectedPromise3 = Q.reject(new Error("test error 3"));
        expect(Q.getUnhandledReasons().length).toBe(1);

        // Now handle the third rejection
        await rejectedPromise3.catch(() => {});
        expect(Q.getUnhandledReasons().length).toBe(0);

        // Create a fourth rejected promise and handle it with a delay
        const rejectedPromise4 = Q.reject(new Error("test error 4"));
        setTimeout(() => {
            rejectedPromise4.catch(() => {});
        }, 10);
        await Q.delay(20);
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});