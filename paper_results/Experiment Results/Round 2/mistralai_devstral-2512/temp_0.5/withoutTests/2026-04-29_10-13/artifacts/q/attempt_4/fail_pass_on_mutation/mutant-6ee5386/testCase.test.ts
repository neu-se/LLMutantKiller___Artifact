const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise rejection behavior", () => {
    it("should properly handle promise rejection in finally", async () => {
        let finallyError = null;
        try {
            await Q.reject(new Error("test error")).finally(() => {
                finallyError = new Error("finally error");
                throw finallyError;
            });
        } catch (e) {
            // Expected to catch the finally error
        }
        expect(finallyError).not.toBeNull();
    });
});