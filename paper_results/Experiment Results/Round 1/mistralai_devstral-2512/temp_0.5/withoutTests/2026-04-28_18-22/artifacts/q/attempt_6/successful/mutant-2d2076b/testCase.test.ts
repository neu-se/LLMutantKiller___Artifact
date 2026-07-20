const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delay behavior with undefined timeout", () => {
  it("should behave differently based on timeout parameter", (done) => {
    const testValue = "test";
    const promise = Q.delay(testValue, undefined);

    // Set a timeout to detect if the promise doesn't resolve immediately
    const timeout = setTimeout(() => {
      done(new Error("Promise did not resolve immediately"));
    }, 50);

    promise.then((value: unknown) => {
      clearTimeout(timeout);
      // The original code should resolve immediately with undefined
      // The mutated code might behave differently
      expect(value).toBeUndefined();
      done();
    }).catch((error: unknown) => {
      clearTimeout(timeout);
      done(error as Error);
    });
  });
});