import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nodeify method", () => {
  it("should return the promise when called without a nodeback", () => {
    const testValue = "test";
    const originalPromise = Q.resolve(testValue);
    const result = originalPromise.nodeify();
    expect(result).toBe(originalPromise);
    return result.then((value: any) => {
      expect(value).toBe(testValue);
    });
  });
});