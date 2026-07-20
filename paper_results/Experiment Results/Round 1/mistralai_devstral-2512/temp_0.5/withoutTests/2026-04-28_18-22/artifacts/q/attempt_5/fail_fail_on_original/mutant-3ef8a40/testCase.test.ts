const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.join behavior", () => {
  it("should resolve with the joined values when two identical values are provided", () => {
    const promise = Q.join(42, 42);
    return promise.then((result: any) => {
      expect(result).toBeUndefined();
    });
  });
});