import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending in consonant + 'o' with 'es'", () => {
    expect(plural("potato", 2)).toBe("potatoes");
  });
});