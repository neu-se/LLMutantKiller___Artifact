import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural rule for quy ending", () => {
  it("should add 's' to a word containing 'quy' not at the end of the word", () => {
    // Original regex: /[^aeiou]y$|quy$/i — requires 'quy' at end of string, no match here
    // Mutated regex: /[^aeiou]y$|quy/i — matches 'quy' anywhere, incorrectly transforms word
    // Original: no rule matches 'quyable', returns 'quyable' + 's' = 'quyables'
    // Mutated: matches 'quy' inside 'quyable', returns 'quyabl' + 'ies' = 'quyablies'
    expect(plural("quyable")).toBe("quyables");
  });
});