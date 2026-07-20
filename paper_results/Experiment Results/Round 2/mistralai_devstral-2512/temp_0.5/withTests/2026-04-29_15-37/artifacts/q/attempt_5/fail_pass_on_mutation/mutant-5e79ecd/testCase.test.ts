import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done behavior", () => {
  it("should handle fulfilled promise with callbacks and return undefined", () => {
    let callbackInvoked = false;
    const promise = Q.resolve(42);
    const result = promise.done((value: number) => {
      callbackInvoked = true;
      expect(value).toBe(42);
    });
    expect(result).toBeUndefined();
    return Q.delay(10).then(() => {
      expect(callbackInvoked).toBe(true);
    });
  });
});