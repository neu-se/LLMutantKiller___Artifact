import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - vowel+o words", () => {
  it("should pluralize 'video' correctly as 'videos'", () => {
    expect(plural("video")).toBe("videos");
  });
});