const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise post method", () => {
  it("should handle non-function objects correctly when name is null", () => {
    const obj = {
      value: 42
    };

    const promise = Q(obj);
    const resultPromise = promise.post(null, []);

    return resultPromise.then((result: any) => {
      expect(result).toBeUndefined();
    });
  });
});