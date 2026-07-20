import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.tap function", () => {
  it("should return a promise that resolves to the original value", () => {
    const promise = Q.resolve(42);
    const callback = jest.fn(() => Q.resolve("callback result"));
    const result = Q.tap(promise, callback);
    return result.then((value: number) => {
      expect(value).toBe(42);
      expect(callback).toHaveBeenCalledWith(42);
    });
  });
});