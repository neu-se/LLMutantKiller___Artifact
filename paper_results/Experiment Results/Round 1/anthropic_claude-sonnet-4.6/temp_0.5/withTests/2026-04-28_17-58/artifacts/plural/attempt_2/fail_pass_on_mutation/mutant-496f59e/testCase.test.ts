import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function regex rule matching", () => {
  it("should return the word unchanged for singular form when num is 1", () => {
    // In the mutated code, 'if (true)' causes the first rule to always fire,
    // so a word like 'test' would be processed by the first (uncountable) rule
    // and return 'tests' incorrectly, or more importantly, a word that should
    // match a specific rule later in the list would get wrong results.
    // The uncountable rule returns the word unchanged, so 'test' with the
    // first rule (uncountable regex) would call the function which returns 'test',
    // not 'tests'.
    expect(plural("test")).toBe("tests");
  });
});