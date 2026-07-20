import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending in vowel + 'o' with 's' and not 'es'", () => {
    expect(plural("zoo", 2)).toBe("zoos");
  });
});