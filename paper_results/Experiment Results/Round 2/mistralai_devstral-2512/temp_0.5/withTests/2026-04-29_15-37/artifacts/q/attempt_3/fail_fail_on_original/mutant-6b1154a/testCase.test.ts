import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method behavior", () => {
  it("should handle promise with fulfilled callback", () => {
    let callbackInvoked = false;
    const promise = Q.resolve(42);
    const result = promise.done((value) => {
      callbackInvoked = true;
      expect(value).toBe(42);
    });
    expect(result).toBeUndefined();
    expect(callbackInvoked).toBe(true);
  });
});