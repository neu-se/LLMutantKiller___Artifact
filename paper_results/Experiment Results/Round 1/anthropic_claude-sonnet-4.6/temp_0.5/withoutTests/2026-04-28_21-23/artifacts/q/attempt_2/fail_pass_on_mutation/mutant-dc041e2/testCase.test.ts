import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q noConflict", () => {
  it("should throw when noConflict is called in non-global environment", () => {
    expect(() => Q.noConflict()).toThrow("Q.noConflict only works when Q is used as a global");
  });
});