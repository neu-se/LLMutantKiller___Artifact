import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.noConflict error message", () => {
  it("should throw an error with the correct message when called", () => {
    expect(() => {
      Q.noConflict();
    }).toThrow("Q.noConflict only works when Q is used as a global");
  });
});