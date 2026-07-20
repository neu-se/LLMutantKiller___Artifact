const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.isRejected function", () => {
  it("should return false for non-promise objects", () => {
    expect(Q.isRejected({})).toBe(false);
  });
});