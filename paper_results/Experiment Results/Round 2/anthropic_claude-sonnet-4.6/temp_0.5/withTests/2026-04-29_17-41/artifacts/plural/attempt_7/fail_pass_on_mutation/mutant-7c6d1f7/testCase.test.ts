import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - words ending in vowel+o followed by checking rules array integrity", () => {
  it("should pluralize 'rodeo' as 'rodeos'", () => {
    expect(plural("rodeo")).toBe("rodeos");
  });
});