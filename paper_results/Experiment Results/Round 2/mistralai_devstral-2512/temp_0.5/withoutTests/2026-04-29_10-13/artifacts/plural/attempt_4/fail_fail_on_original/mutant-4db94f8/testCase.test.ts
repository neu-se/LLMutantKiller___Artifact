import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with string-based rules", () => {
  it("should correctly handle string-based pluralization rules when type checking is bypassed", () => {
    // This test specifically targets the mutation where type checking is removed
    // The mutation changes: if (type(rule[0]) === 'String' && rule[0] === word)
    // To: if (true && rule[0] === word)
    // This means non-string rules might incorrectly match string-based words

    // Add a custom rule that would only match if type checking is bypassed
    plural.addRule(/test/i, "mutated");

    // Now test a word that should match the string rule but not the regex
    expect(plural("criterion")).toBe("criteria");
    expect(plural("bacterium")).toBe("bacteria");

    // This should fail on mutated code because the regex rule might match first
    // when type checking is removed
    expect(plural("test")).not.toBe("mutated");
  });
});