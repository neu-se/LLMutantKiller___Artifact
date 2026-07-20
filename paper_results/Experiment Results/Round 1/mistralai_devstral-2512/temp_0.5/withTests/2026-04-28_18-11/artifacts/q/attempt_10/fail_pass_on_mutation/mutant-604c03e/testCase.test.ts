const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("unhandled rejection tracking", () => {
    it("should correctly handle multiple rejection tracking scenarios", async () => {
        // Reset unhandled rejections tracking
        Q.resetUnhandledRejections();

        // Create first rejected promise and handle it
        const promise1 = Q.reject(new Error("error1"));
        await promise1.catch(() => {});
        expect(Q.getUnhandledReasons().length).toBe(0);

        // Create second rejected promise and handle it
        const promise2 = Q.reject(new Error("error2"));
        await promise2.catch(() => {});
        expect(Q.getUnhandledReasons().length).toBe(0);

        // Create third rejected promise and don't handle it
        const promise3 = Q.reject(new Error("error3"));
        expect(Q.getUnhandledReasons().length).toBe(1);

        // Now handle the third promise
        await promise3.catch(() => {});
        expect(Q.getUnhandledReasons().length).toBe(0);

        // Create a promise that will be rejected but handled synchronously
        const deferred = Q.defer();
        const promise4 = deferred.promise.catch(() => {});
        deferred.reject(new Error("error4"));
        await promise4;
        expect(Q.getUnhandledReasons().length).toBe(0);
    });
});