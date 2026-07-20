import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should handle regex rule with string result value", () => {
    jest.resetModules();
    const plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");
    
    // Add a regex rule with a string (non-function) result
    // Original: type(rule[1]) === 'Function' is false, returns the string 'testplural'
    // Mutated: true ? rule[1](word, rule[0]) : rule[1] tries to call 'testplural' as function -> TypeError
    plural.addRule(/^uniquetestword$/i, 'testplural');
    
    expect(plural('uniquetestword')).toBe('testplural');
  });
});