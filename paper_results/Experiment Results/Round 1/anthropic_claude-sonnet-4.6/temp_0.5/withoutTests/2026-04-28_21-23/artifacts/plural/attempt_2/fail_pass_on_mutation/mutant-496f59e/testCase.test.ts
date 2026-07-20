import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should not apply string rules to non-matching words", () => {
    // 'goose' -> 'geese' is a string rule
    // A word that doesn't match any rule should return word+'s', not 'geese'
    // With mutation, any word reaching the 'goose' string rule returns 'geese'
    // 'cat' should reach string rules since no regex matches it
    // With mutation, 'cat' would return 'geese' (or whatever string rule it hits first)
    expect(plural("cat")).toBe("cats");
  });
});