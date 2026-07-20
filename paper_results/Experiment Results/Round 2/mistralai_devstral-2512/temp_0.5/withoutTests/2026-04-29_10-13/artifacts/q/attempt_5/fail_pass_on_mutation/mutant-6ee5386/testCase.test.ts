const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise finally behavior", () => {
    it("should propagate errors thrown in finally", async () => {
        let errorCaught = false;
        const originalError = new Error("original");
        const finallyError = new Error("finally");

        try {
            await Q.reject(originalError).finally(() => {
                throw finallyError;
            });
        } catch (e) {
            errorCaught = e === finallyError;
        }

        expect(errorCaught).toBe(true);
    });
});