import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isPromiseAlike", () => {
  it("correctly identifies thenable objects", () => {
    const thenable = { then: function() {} };
    expect(Q.isPromiseAlike(thenable)).toBe(true);
    expect(Q.isPromiseAlike(null)).toBe(false);
    expect(Q.isPromiseAlike(42)).toBe(false);
  });
});