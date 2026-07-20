import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with string rules", () => {
  it("should correctly pluralize words with string-based rules like criterion -> criteria", () => {
    // In the original code, the condition `type(rule[0]) === 'RegExp'` correctly
    // routes regex rules vs string rules. The string rule `addRule('criterion', 'criteria')`
    // should return 'criteria' without trying to call the string as a function.
    // In the mutated code, `if (true)` always enters the first branch and tries to
    // call rule[1](word, rule[0]) even when rule[1] is a string, causing a TypeError.
    expect(plural("criterion")).toBe("criteria");
  });
});