const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.any", () => {
  it("should call the any function on a promise instance", () => {
    const promise = Q.resolve(42);
    const anyFunc = promise.any;
    expect(typeof anyFunc).toBe("function");
    const result = anyFunc.call(promise);
    expect(result).toBeDefined();
    return result.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});