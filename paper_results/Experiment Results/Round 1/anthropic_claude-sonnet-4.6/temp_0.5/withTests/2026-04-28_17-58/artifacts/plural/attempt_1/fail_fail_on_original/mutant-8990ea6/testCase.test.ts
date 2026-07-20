import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural rule for quy ending", () => {
  it("should not pluralize a word containing 'quy' not at the end", () => {
    // 'quys' contains 'quy' but does NOT end with 'quy'
    // Original regex: /[^aeiou]y$|quy$/i — requires 'quy' at end of string
    // Mutated regex: /[^aeiou]y$|quy/i — matches 'quy' anywhere in string
    // Original: no rule matches, returns 'quys' + 's' = 'quyss'
    // Mutated: matches 'quy' inside 'quys', returns 'quyies'
    expect(plural("quys")).toBe("quyss");
  });
});