import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - vowel-o words", () => {
  it("should pluralize 'video' as 'videos' not 'vidves'", () => {
    expect(plural("video")).toBe("videos");
  });
});