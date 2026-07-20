import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - stereo/vowel-o words", () => {
  it("should pluralize words ending in a vowel followed by 'o' by adding 's' (e.g., stereo -> stereos)", () => {
    expect(plural("stereo")).toBe("stereos");
  });
});