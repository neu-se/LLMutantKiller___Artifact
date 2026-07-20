import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should handle regex rule with string value without calling string as function", () => {
    // Add a regex rule with a string value (not a function)
    plural.addRule(/^testinput$/, 'testoutput');
    // Original: type(rule[1]) === 'Function' is false, returns 'testoutput'
    // Mutated: true ? rule[1](word, rule[0]) : rule[1] -> tries to call 'testoutput' as function -> TypeError
    expect(plural("testinput")).toBe("testoutput");
  });
});