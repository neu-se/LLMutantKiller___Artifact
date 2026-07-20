const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise post method", () => {
  it("should handle null or undefined method names correctly", () => {
    const obj = {
      method: function() {
        return "called";
      }
    };

    const promise = Q(obj);
    const resultPromise = promise.post(undefined, []);

    return resultPromise.then((result: any) => {
      expect(result).toBeUndefined();
    });
  });
});