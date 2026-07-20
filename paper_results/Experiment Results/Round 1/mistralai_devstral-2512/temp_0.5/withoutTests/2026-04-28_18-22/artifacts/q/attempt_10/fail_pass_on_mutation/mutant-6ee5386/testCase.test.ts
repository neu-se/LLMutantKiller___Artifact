const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise finally behavior", () => {
  it("should properly handle thrown errors in finally with rejection state", async () => {
    const testError = new Error("finally error");
    let finallyExecuted = false;
    let rejectionHandled = false;

    const promise = Q.reject(new Error("initial"))
      .finally(() => {
        finallyExecuted = true;
        throw testError;
      })
      .catch((e) => {
        rejectionHandled = true;
        return e;
      });

    const result = await promise;
    expect(finallyExecuted).toBe(true);
    expect(rejectionHandled).toBe(true);
    expect(result).toBe(testError);
  });
});