const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise finally behavior", () => {
  it("should correctly propagate errors thrown in finally handler", async () => {
    const testError = new Error("finally error");
    let finallyCalled = false;
    let errorPropagated = false;

    try {
      await Q.resolve("value")
        .finally(() => {
          finallyCalled = true;
          throw testError;
        });
    } catch (e) {
      errorPropagated = true;
      expect(e).toBe(testError);
    }

    expect(finallyCalled).toBe(true);
    expect(errorPropagated).toBe(true);
  });
});