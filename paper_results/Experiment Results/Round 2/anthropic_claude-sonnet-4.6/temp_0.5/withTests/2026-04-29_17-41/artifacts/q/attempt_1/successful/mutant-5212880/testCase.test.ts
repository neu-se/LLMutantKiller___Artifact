import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done static method", () => {
  it("should call the fulfilled callback when used as Q.done(promise, fulfilled)", (done) => {
    let called = false;

    Q.done(Q(42), function (value: number) {
      called = true;
      expect(value).toBe(42);
      done();
    });

    // Give it time to resolve; if Q.done is a no-op, done() will never be called
    setTimeout(() => {
      if (!called) {
        done(new Error("Q.done did not invoke the fulfilled callback"));
      }
    }, 500);
  });
});