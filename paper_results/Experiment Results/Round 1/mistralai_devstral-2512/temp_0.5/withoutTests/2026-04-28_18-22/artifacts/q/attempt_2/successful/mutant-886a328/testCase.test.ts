const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.noConflict", () => {
  it("should throw an error with a specific message when Q is not used as a global", () => {
    expect(() => {
      Q.noConflict();
    }).toThrow("Q.noConflict only works when Q is used as a global");
  });
});