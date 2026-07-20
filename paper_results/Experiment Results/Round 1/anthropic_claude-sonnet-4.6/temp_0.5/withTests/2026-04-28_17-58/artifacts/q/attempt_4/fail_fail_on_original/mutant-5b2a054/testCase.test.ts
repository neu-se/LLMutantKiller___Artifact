import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick error propagation", () => {
  it("propagates errors thrown inside nextTick tasks", (done) => {
    const testError = new Error("test error from nextTick");
    
    process.once("uncaughtException", function (err) {
      expect(err).toBe(testError);
      done();
    });

    Q.nextTick(function () {
      throw testError;
    });

    setTimeout(function () {
      done(new Error("Expected uncaughtException was never fired"));
    }, 500);
  });
});