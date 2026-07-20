const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise finally behavior", () => {
    it("should correctly handle errors thrown in finally after rejection", async () => {
        const originalError = new Error("original");
        const finallyError = new Error("finally");
        let caughtError = null;

        try {
            await Q.reject(originalError).finally(() => {
                throw finallyError;
            });
        } catch (e) {
            caughtError = e;
        }

        expect(caughtError).toBe(finallyError);
    });
});