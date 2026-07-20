import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should return the singular form when num is 1", () => {
    // When num === 1, the word should NOT be pluralized
    // Original: num !== 1 || num === undefined => 1 !== 1 || 1 === undefined => false || false => false => return word
    // Mutated:  num !== 1 || false             => 1 !== 1 || false           => false || false => false => return word
    // Both behave the same for num=1, so test undefined behavior instead
    
    // The key difference: calling plural(word) with no num argument
    // undefined !== 1 is true in both, so both pluralize - same behavior
    
    // Actually test: plural called with num=undefined explicitly
    // undefined !== 1 => true in both cases, so both pluralize
    
    // The only real behavioral difference would be if somehow num===1 AND undefined
    // which is impossible. Let's test the basic pluralization to ensure correctness.
    
    // Test that plural("cat") returns "cats" (no num argument)
    expect(plural("cat")).toBe("cats");
    // Test that plural("cat", 1) returns "cat" (singular)
    expect(plural("cat", 1)).toBe("cat");
    // Test that plural("cat", 2) returns "cats"
    expect(plural("cat", 2)).toBe("cats");
    // Test with undefined explicitly - should pluralize
    expect(plural("cat", undefined)).toBe("cats");
  });
});