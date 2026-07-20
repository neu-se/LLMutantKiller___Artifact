import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending in vowel + 'o'", () => {
    expect(plural("radio", 2)).toBe("radios");
    expect(plural("studio", 3)).toBe("studios");
    expect(plural("video", 4)).toBe("videos");
  });
});