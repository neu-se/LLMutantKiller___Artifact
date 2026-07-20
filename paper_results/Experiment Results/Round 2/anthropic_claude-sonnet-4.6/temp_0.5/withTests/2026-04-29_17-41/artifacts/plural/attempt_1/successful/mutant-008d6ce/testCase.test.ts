import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural with explicit num=2 should pluralize", () => {
  it("should return plural form when num is 2 (not 1)", () => {
    // The mutation changes `if (num !== 1 || num === undefined)` to `if (false || num === undefined)`
    // This means when num is explicitly 2 (not undefined), the mutated code will NOT pluralize
    // because `false || (2 === undefined)` is false, so it falls through to `return word`
    // The original code: `(2 !== 1 || 2 === undefined)` = `(true || false)` = true, so it pluralizes
    expect(plural("test", 2)).toBe("tests");
  });
});