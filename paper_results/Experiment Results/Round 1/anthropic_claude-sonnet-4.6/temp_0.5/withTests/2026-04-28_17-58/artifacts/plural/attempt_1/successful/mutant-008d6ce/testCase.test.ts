import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural with explicit num=2 should pluralize", () => {
  it("should return plural form when num is 2 (not 1)", () => {
    // The mutation changes `if (num !== 1 || num === undefined)` to `if (false || num === undefined)`
    // This means when num=2 (which is not undefined), the condition becomes false,
    // so the function returns the word unchanged instead of pluralizing it.
    // Original: num !== 1 (true for 2) || num === undefined (false) => true => pluralize
    // Mutated:  false || num === undefined (false) => false => return word unchanged
    expect(plural("test", 2)).toBe("tests");
  });
});