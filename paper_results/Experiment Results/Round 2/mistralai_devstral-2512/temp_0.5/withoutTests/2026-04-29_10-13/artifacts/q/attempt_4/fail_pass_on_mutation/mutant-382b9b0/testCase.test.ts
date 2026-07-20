const Q = require("../../../../../../../../../../../subject_repositories/q/q");

describe("Q.nodeify", () => {
  it("should return the promise when nodeback is not provided", () => {
    const expectedValue = "test";
    const promise = Q.resolve(expectedValue);
    const result = promise.nodeify();

    expect(result).toBe(promise);
    return result.then((value: any) => {
      expect(value).toBe(expectedValue);
    });
  });
});