import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - words ending in consonant+o should get es not s", () => {
  it("should pluralize 'tornado' as 'tornadoes'", () => {
    expect(plural("tornado")).toBe("tornadoes");
  });
});