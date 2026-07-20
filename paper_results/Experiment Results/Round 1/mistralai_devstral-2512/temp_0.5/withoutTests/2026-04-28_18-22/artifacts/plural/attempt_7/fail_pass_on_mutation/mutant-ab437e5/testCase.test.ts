import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'y' preceded by a vowel", () => {
    expect(plural("boy", 2)).toBe("boys");
  });
});