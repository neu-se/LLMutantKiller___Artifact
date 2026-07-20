import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural with num argument", () => {
  it("should return the plural form when num is not 1 (e.g., num = 2)", () => {
    // When num !== 1, the plural form should be returned
    // Original: if (num !== 1 || num === undefined) -> pluralize when num is 2
    // Mutant:   if (num === 1 || num === undefined)  -> does NOT pluralize when num is 2
    expect(plural("test", 2)).toBe("tests");
  });
});