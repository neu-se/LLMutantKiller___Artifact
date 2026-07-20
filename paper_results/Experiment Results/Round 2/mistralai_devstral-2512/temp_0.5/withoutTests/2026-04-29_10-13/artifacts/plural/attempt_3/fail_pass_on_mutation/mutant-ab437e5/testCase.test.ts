import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'y' when not preceded by a vowel", () => {
    expect(plural("sky")).toBe("skies");
    expect(plural("fly")).toBe("flies");
    expect(plural("candy")).toBe("candies");
  });
});