import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural basic functionality", () => {
  it("should pluralize a simple word correctly without being affected by initial rules array content", () => {
    // The mutation initializes rules with ["Stryker was here"] instead of []
    // This means the rules array has a non-array-pair element at index 0
    // When plural() iterates over rules, it will try to access rule[0] and rule[1]
    // on the string "Stryker was here", where rule[0] = 'S' and rule[1] = 't'
    // This won't match any word, but the presence of this element could cause issues
    // More importantly, addRule uses unshift, so new rules go before "Stryker was here"
    // The real problem: when iterating, if we reach "Stryker was here" in the array,
    // type(rule[0]) for 'S' (a string character) would be 'String', and it would check
    // if 'S' === word, which won't match typical words.
    // However, for a word like 'S', it would incorrectly return rule[1] = 't'
    // Let's test a simple pluralization that should work normally
    expect(plural("test")).toBe("tests");
    expect(plural("cherry")).toBe("cherries");
    expect(plural("box")).toBe("boxes");
    expect(plural("knife")).toBe("knives");
    expect(plural("criterion")).toBe("criteria");
    // Test that the word 'S' doesn't get corrupted by the mutant's initial array element
    // In the mutant, rules starts with "Stryker was here"
    // When iterating, rule = "Stryker was here", rule[0] = 'S', rule[1] = 't'
    // type('S') === 'String' and 'S' === 'S' would be true!
    // So plural('S') would return 't' in the mutant, but 'Ss' in the original
    expect(plural("S")).toBe("Ss");
  });
});