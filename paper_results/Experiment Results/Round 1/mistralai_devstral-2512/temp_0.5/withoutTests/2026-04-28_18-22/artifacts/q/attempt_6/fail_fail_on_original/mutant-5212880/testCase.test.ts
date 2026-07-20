const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.done", () => {
  it("should return the promise chain when called with callbacks", () => {
    let callbackInvoked = false;
    const promise = Q.resolve(42);
    const result = Q.done(promise, (value: number) => {
      callbackInvoked = true;
      return value;
    });
    expect(result).toBe(promise);
    return promise.then(() => {
      expect(callbackInvoked).toBe(true);
    });
  });
});