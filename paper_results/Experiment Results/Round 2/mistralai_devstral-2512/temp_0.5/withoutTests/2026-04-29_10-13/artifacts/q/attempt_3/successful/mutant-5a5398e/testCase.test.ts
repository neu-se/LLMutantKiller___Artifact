const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.denodeify error message test", () => {
  it("should throw an error with a descriptive message when wrapping an undefined function", () => {
    expect(() => {
      Q.denodeify(undefined);
    }).toThrow("Q can't wrap an undefined function");
  });
});