import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'y' preceded by a consonant", () => {
    expect(plural("city", 2)).toBe("cities");
  });
});