import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - num parameter behavior", () => {
  it("should return singular form when num is 1 for vowel-o words", () => {
    expect(plural("embryo", 1)).toBe("embryo");
    expect(plural("embryo", 2)).toBe("embryos");
    expect(plural("stereo", 2)).toBe("stereos");
  });
});