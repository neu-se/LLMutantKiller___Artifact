const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise finally behavior", () => {
    it("should correctly propagate errors from finally block", async () => {
        const testError = new Error("test error");
        let caughtError = null;

        try {
            await Q.resolve().finally(() => {
                throw testError;
            });
        } catch (e) {
            caughtError = e;
        }

        expect(caughtError).toBe(testError);
    });
});