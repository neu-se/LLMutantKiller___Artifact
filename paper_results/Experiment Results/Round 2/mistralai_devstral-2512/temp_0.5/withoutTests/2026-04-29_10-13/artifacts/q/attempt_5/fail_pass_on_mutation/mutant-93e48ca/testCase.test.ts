const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise post method", () => {
  it("should handle function objects correctly when name is null", () => {
    const func = function() {
      return "called";
    };

    const promise = Q(func);
    const resultPromise = promise.post(null, []);

    return resultPromise.then((result: any) => {
      expect(result).toBe("called");
    });
  });
});