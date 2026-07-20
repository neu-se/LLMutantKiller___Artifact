const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior with conditional callbacks", () => {
  it("should handle promise with callbacks differently than without", (done) => {
    const originalPromise = Q.resolve(42);
    const promiseWithCallbacks = originalPromise.done(
      (value: number) => value,
      (error: Error) => { throw error; },
      (progress: number) => progress
    );

    const promiseWithoutCallbacks = originalPromise.done();

    // The key difference: with callbacks, done() should return undefined
    // without callbacks, done() should return the promise
    expect(promiseWithCallbacks).toBeUndefined();
    expect(promiseWithoutCallbacks).toBe(originalPromise);

    done();
  });
});