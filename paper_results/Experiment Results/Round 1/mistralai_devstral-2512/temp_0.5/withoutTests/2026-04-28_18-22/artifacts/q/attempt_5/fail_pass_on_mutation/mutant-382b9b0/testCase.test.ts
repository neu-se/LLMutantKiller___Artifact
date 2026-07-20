import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nodeify", () => {
  it("should return undefined when nodeback is not provided in the mutated version", () => {
    const expectedValue = "test";
    const promise = Q.resolve(expectedValue);
    const result = promise.nodeify();
    expect(result).not.toBeUndefined();
    return result.then((value: any) => {
      expect(value).toBe(expectedValue);
    });
  });
});