const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior with conditional callbacks", () => {
  it("should handle promise with callbacks differently than without", (done) => {
    const originalPromise = Q.resolve(42);

    // Test with callbacks - should return undefined
    const promiseWithCallbacks = originalPromise.done(
      (value: number) => value,
      (error: Error) => { throw error; },
      (progress: number) => progress
    );

    // Test without callbacks - should return undefined in mutated version
    const promiseWithoutCallbacks = originalPromise.done();

    // In original code: with callbacks returns undefined, without returns promise
    // In mutated code: both return undefined (due to `var promise = true ?`)
    expect(promiseWithCallbacks).toBeUndefined();
    expect(promiseWithoutCallbacks).not.toBeUndefined();
    expect(promiseWithoutCallbacks).toBe(originalPromise);

    done();
  });
});