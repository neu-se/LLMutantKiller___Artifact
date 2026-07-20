const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise finally behavior", () => {
  it("should properly handle rejection when error is thrown in finally", async () => {
    const testError = new Error("test error");
    const finallyError = new Error("finally error");
    let rejectionHandled = false;

    await Q.reject(testError)
      .finally(() => {
        throw finallyError;
      })
      .catch((e) => {
        rejectionHandled = true;
        expect(e).toBe(finallyError);
      });

    expect(rejectionHandled).toBe(true);
  });
});