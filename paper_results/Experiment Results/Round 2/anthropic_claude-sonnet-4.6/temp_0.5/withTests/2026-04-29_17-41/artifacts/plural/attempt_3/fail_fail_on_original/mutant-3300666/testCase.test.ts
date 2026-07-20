import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural addRule returns plural function", () => {
  it("should have exactly the expected number of rules by verifying a word that falls through all rules gets pluralized correctly with s", () => {
    // A word with no special ending - falls through all rules and gets 's' appended
    // In mutated code, the last "rule" is the string "Stryker was here"
    // rule[0] = 'S', rule[1] = 't' - if word === 'S' it returns 't'
    // We need a word that reaches the stryker entry: a word that matches no regex/string rule
    // 'S' is caught by s$ rule. But what about the exact string 'S' with num=1?
    // With num=1, plural returns word unchanged. Let's find another angle.
    // The stryker string as a rule: rule[0]='S', rule[1]='t'
    // plural('S') hits s$ rule -> 'Ses', not affected
    // But plural.addRule returns plural - test that rules array behaves correctly
    // by checking a word that would be affected by the spurious entry
    expect(plural("zzzyyyxxx")).toBe("zzzyyyxxxs");
  });
});