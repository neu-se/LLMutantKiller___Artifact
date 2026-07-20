import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - words ending in vowel+o should use vowel+o rule not fall to default", () => {
  it("should pluralize 'studio' as 'studios'", () => {
    expect(plural("studio")).toBe("studios");
  });
});