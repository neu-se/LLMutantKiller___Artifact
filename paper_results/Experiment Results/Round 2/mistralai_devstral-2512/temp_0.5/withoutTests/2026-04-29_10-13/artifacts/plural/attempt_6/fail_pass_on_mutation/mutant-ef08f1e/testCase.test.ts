import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'eo' by adding 's'", () => {
    expect(plural("stereo", 2)).toBe("stereos");
    expect(plural("portfolio", 2)).toBe("portfolios");
    expect(plural("studio", 2)).toBe("studios");
  });
});