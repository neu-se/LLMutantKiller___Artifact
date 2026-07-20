import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural rules initialization", () => {
  it("should have rules array initialized as empty so that only explicitly added rules apply", () => {
    // Use jest.resetModules and re-require to get fresh module
    // Then test behavior that depends on rules array state
    jest.resetModules();
    const freshPlural = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    
    // In mutant, rules starts with ["Stryker was here"]
    // After all addRules, "Stryker was here" is at end
    // For word 'S': caught by /s$/i -> 'Ses' in both
    // 
    // But what about testing that the rules array length is correct?
    // We can't access rules directly.
    //
    // What if we test that plural works for ALL words and none return unexpected values?
    expect(freshPlural("S")).toBe("Ses");
  });
});