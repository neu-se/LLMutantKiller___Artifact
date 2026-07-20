import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nodeify", () => {
  it("should return the promise itself when nodeback is not provided", () => {
    const expectedValue = "test";
    const promise = Q.resolve(expectedValue);
    const result = promise.nodeify();
    expect(result).toBe(promise);
    return result.then((value: any) => {
      expect(value).toBe(expectedValue);
    });
  });
});