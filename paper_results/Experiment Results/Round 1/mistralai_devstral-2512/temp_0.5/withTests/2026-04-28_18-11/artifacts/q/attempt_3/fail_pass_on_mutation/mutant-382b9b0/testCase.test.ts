import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("nodeify method", () => {
  it("should return a promise when called without a nodeback", () => {
    const testValue = "test";
    const promise = Q.resolve(testValue).nodeify();
    expect(promise).toBeDefined();
    expect(typeof promise.then).toBe("function");
    return promise.then((value: any) => {
      expect(value).toBe(testValue);
    });
  });
});