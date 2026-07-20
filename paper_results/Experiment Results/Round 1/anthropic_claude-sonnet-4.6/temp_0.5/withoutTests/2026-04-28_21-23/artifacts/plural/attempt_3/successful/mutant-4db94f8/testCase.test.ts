import plural, { addRule } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should only apply string-keyed rules when rule key type is String, not for non-string keys equal to word", () => {
    // Add a rule with a numeric key (not a string, not a RegExp)
    // Original code checks: type(rule[0]) === 'String' && rule[0] === word
    //   -> type(42) === 'String' is false -> rule is skipped
    // Mutated code checks: true && rule[0] === word
    //   -> true && 42 === 42 is true -> rule matches and returns 'matched'
    addRule(42 as any, "matched");
    expect(plural(42 as any)).not.toBe("matched");
  });
});