import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - consonant-o words", () => {
  it("should pluralize 'hero' as 'heroes' not 'heros'", () => {
    expect(plural("hero")).toBe("heroes");
  });
});