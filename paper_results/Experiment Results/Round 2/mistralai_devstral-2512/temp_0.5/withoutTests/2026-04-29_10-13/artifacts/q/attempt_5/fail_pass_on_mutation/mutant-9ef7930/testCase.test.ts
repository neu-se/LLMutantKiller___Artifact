const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.race mutation test", () => {
  it("should handle array with one promise correctly", () => {
    const promise = Q.resolve(42);
    return Q.race([promise]).then((result) => {
      expect(result).toBe(42);
    });
  });
});