const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior with conditional callbacks", () => {
  it("should create different promise instances based on callback presence", (done) => {
    const originalPromise = Q.resolve(42);
    const promiseWithCallbacks = originalPromise.done(
      (value) => value,
      (error) => { throw error; },
      (progress) => progress
    );

    const promiseWithoutCallbacks = originalPromise.done();

    // These should be different promise instances
    expect(promiseWithCallbacks).not.toBe(promiseWithoutCallbacks);

    // Both should still resolve to the same value
    let value1: number | null = null;
    let value2: number | null = null;

    promiseWithCallbacks.then((val: number) => { value1 = val; });
    promiseWithoutCallbacks.then((val: number) => { value2 = val; });

    setTimeout(() => {
      expect(value1).toBe(42);
      expect(value2).toBe(42);
      done();
    }, 10);
  });
});