const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.join behavior", () => {
  it("should reject when two different values are joined", () => {
    const promise = Q.join(42, 43);
    return expect(promise).rejects.toBeDefined();
  });
});