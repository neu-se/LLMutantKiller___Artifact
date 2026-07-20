import plural, { addRule } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should handle RegExp rule with string result correctly", () => {
    // Add a rule where rule[0] is RegExp and rule[1] is a string
    // In mutated code: rule[1](word, rule[0]) would throw TypeError since rule[1] is a string
    addRule(/^testword$/, 'testwords');
    expect(() => plural("testword", 2)).not.toThrow();
    expect(plural("testword", 2)).toBe("testwords");
  });
});