import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap static method", () => {
  it("should call the callback and resolve with the original value when using Q.tap", async () => {
    let callbackCalled = false;
    const originalValue = "test-value";

    const result = await Q.tap(Q(originalValue), function (value: string) {
      callbackCalled = true;
      expect(value).toBe(originalValue);
      return "ignored-return";
    });

    expect(callbackCalled).toBe(true);
    expect(result).toBe(originalValue);
  });
});