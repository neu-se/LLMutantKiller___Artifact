const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise finally behavior", () => {
  it("should handle errors thrown in finally with proper rejection tracking", async () => {
    const testError = new Error("test");
    let finallyExecuted = false;
    let caughtError = null;

    await Q.resolve()
      .finally(() => {
        finallyExecuted = true;
        throw testError;
      })
      .catch((e) => {
        caughtError = e;
      });

    expect(finallyExecuted).toBe(true);
    expect(caughtError).toBe(testError);
  });
});