const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("promise constructor", () => {
  it("should throw a TypeError with a descriptive message when resolver is not a function", () => {
    expect(() => {
      Q.promise(undefined);
    }).toThrow("resolver must be a function.");
  });
});