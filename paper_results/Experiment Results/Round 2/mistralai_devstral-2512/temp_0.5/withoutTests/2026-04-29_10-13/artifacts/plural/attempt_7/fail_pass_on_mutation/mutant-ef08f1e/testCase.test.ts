import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should not match words containing 'eo' in the middle when they end with a vowel + 'o'", () => {
    expect(plural("stereo", 2)).toBe("stereos");
    expect(plural("zoo", 2)).toBe("zoos");
  });
});