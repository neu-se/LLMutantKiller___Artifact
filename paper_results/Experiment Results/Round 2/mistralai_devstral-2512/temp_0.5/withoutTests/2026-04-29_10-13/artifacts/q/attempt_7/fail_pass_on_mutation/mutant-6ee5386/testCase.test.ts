const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise finally behavior", () => {
    it("should properly track error thrown in finally block", async () => {
        let finallyExecuted = false;
        let errorThrownInFinally = false;

        try {
            await Q.reject(new Error("original")).finally(() => {
                finallyExecuted = true;
                throw new Error("finally error");
            });
        } catch (e) {
            errorThrownInFinally = true;
        }

        expect(finallyExecuted).toBe(true);
        expect(errorThrownInFinally).toBe(true);
    });
});