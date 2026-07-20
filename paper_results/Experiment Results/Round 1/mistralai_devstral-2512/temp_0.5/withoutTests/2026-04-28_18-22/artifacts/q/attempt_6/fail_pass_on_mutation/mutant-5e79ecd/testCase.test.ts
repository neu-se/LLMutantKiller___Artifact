const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior", () => {
  it("should properly handle promise chaining when done is called without callbacks", () => {
    const promise = Q.resolve(42);
    const result = promise.done();

    // The mutation changes the promise assignment logic in done()
    // In the mutated version, result will be `true` instead of the promise
    // This test verifies the correct return value
    expect(result).toBeUndefined();

    return promise.then((value: any) => {
      expect(value).toBe(42);
    });
  });
});