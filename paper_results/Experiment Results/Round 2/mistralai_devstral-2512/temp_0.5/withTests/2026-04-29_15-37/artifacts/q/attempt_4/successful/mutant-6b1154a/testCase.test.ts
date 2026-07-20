import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method behavior", () => {
  it("should handle promise with fulfilled callback", () => {
    let callbackInvoked = false;
    const promise = Q.resolve(42);
    const result = promise.done((value: number) => {
      callbackInvoked = true;
      expect(value).toBe(42);
    });
    expect(result).toBeUndefined();
    return promise.then(() => {
      expect(callbackInvoked).toBe(true);
    });
  });
});