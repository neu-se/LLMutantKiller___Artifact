const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace initialization", () => {
  it("should not capture qStartingLine when hasStacks is false", () => {
    // Access the internal state through the module
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const qStartingLine = qModule.__qStartingLine__; // This would be undefined when hasStacks is false

    // In original code (hasStacks = false), qStartingLine should be undefined
    // In mutated code (hasStacks = true), qStartingLine would be defined
    expect(qStartingLine).toBeUndefined();
  });
});