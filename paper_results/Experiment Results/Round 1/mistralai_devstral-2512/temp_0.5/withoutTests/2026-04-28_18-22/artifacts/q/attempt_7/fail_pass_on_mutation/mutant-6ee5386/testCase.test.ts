const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise finally behavior", () => {
  it("should properly handle thrown errors in finally with rejection tracking", async () => {
    const testError = new Error("test error");
    let finallyExecuted = false;
    let rejectionHandled = false;

    await Q.reject(new Error("initial"))
      .finally(() => {
        finallyExecuted = true;
        throw testError;
      })
      .catch((e) => {
        rejectionHandled = true;
        expect(e).toBe(testError);
      });

    expect(finallyExecuted).toBe(true);
    expect(rejectionHandled).toBe(true);
  });
});