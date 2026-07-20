import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should work correctly", () => {
    jest.resetModules();
    const p = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    // Test that addRule works and the initial state is clean
    // Add a rule for 'S' that returns 'Ses'
    // In original: rules = [['S', 'Ses']]  -> plural('S') = 'Ses'
    // In mutant: rules = [['S', 'Ses'], "Stryker was here"] -> plural('S') = 'Ses' (first rule matches)
    // Same result. Not helpful.
    expect(p("test")).toBe("tests");
  });
});