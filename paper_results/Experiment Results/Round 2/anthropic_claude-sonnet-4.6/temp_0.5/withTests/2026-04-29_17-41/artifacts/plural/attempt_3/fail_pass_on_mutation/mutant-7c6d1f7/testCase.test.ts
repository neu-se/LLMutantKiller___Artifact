import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - words ending in consonant+o", () => {
  it("should pluralize 'hero' as 'heroes' not 'heros'", () => {
    expect(plural("hero")).toBe("heroes");
  });
});