import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap", () => {
  it("should return a promise that resolves to the original value", async () => {
    const originalValue = 42;
    const promise = Q.resolve(originalValue);
    const callback = jest.fn(() => Q.resolve("callback result"));
    const result = await Q.tap(promise, callback);
    expect(result).toBe(originalValue);
    expect(callback).toHaveBeenCalledWith(originalValue);
  });
});