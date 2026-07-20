import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should correctly pluralize words with exact string rules without being affected by the type check mutation", () => {
    // Test that string-matched rules work correctly
    // 'criterion' -> 'criteria' is added via addRule('criterion', 'criteria')
    // In the mutated code, type check is removed: if (true && rule[0] === word)
    // This should still work for string rules, but the key is that
    // when rule[0] is a RegExp and doesn't match, rule[0] === word is false
    // However, if we test a word that matches a RegExp rule first,
    // the RegExp branch returns early, so string rules below won't be reached
    
    // The mutation changes: type(rule[0]) === 'String' to true
    // For a RegExp rule[0], type() returns 'RegExp', not 'String'
    // So original: 'RegExp' === 'String' is false -> skip
    // Mutated: true is true -> check rule[0] === word (RegExp === string -> false) -> skip
    // Same behavior... unless rule[1] is accessed differently
    
    // Actually test that string rules return the right value type
    expect(plural("criterion")).toBe("criteria");
    expect(plural("bacterium")).toBe("bacteria");
    expect(plural("person")).toBe("people");
    expect(plural("goose")).toBe("geese");
    expect(plural("die")).toBe("dice");
  });
});