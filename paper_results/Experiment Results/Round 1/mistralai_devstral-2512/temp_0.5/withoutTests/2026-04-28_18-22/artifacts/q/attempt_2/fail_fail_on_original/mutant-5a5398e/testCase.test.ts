const Q = require("./q");

describe("Q.denodeify error message", () => {
  it("should throw an error with a descriptive message when wrapping an undefined function", () => {
    expect(() => {
      Q.denodeify(undefined);
    }).toThrow("Q can't wrap an undefined function");
  });
});