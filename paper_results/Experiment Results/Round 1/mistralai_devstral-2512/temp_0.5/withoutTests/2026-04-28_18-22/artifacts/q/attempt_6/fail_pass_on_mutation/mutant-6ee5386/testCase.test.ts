const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise finally behavior", () => {
  it("should correctly handle thrown errors in finally with promise chain", async () => {
    let errorCaught = false;
    const testError = new Error("test");

    await Q.resolve()
      .finally(() => {
        throw testError;
      })
      .then(
        () => { throw new Error("Should not reach here"); },
        (e) => {
          errorCaught = true;
          expect(e).toBe(testError);
        }
      );

    expect(errorCaught).toBe(true);
  });
});