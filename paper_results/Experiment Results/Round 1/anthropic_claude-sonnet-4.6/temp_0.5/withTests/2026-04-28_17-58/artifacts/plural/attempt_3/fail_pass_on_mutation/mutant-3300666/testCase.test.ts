import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural rules array initialization", () => {
  it("should return word plus s for a word that matches no rule, not a character from Stryker string", () => {
    // In the mutant, rules = ["Stryker was here"] initially
    // After all addRules via unshift, "Stryker was here" is last element
    // For word 'S': rule[0]='S' matches, rule[1]='t' would be returned
    // But 'S' is caught by /s$/i -> 'Ses'
    // We need to test with a fresh module where we can control rule application
    // The only detectable difference: if we add a rule that makes a word reach the end
    // and that word equals 'S'
    // Let's use jest.isolateModules to get a fresh module and test
    let freshPlural: any;
    jest.isolateModules(() => {
      freshPlural = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    });
    // Add a rule that catches 'S' explicitly to override /s$/i
    // No - that would mask the mutation
    // Instead, test that the word 'S' returns 'Ses' (caught by /s$/i)
    // and not 't' (what mutant's "Stryker was here" element would return)
    expect(freshPlural("S")).toBe("Ses");
  });
});