import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - stereo-type words ending in vowel + o", () => {
  it("should pluralize words ending in a vowel followed by 'o' by appending 's' (e.g., stereo -> stereos)", () => {
    expect(plural("stereo")).toBe("stereos");
  });
});