import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending with 'eo' and not match words with 'eo' followed by other letters", () => {
    expect(plural("stereo", 2)).toBe("stereos");
    expect(plural("stereotype", 2)).toBe("stereotypes");
  });
});