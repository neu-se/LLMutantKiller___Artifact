import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending in vowel + 'o' with 's'", () => {
    expect(plural("kangaroo", 2)).toBe("kangaroos");
  });
});