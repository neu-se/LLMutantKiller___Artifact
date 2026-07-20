const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise finally behavior", () => {
    it("should correctly handle errors thrown in finally block", async () => {
        const error1 = new Error("error1");
        const error2 = new Error("error2");
        let caughtError = null;

        try {
            await Q.reject(error1).finally(() => {
                throw error2;
            });
        } catch (e) {
            caughtError = e;
        }

        expect(caughtError).toBe(error2);
    });
});