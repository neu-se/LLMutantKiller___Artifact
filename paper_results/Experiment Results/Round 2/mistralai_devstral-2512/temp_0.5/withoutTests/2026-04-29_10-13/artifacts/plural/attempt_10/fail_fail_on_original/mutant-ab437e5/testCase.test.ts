import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending with 'y' when preceded by a consonant and followed by 's'", () => {
    expect(plural("citys")).toBe("citys");
    expect(plural("babys")).toBe("babys");
    expect(plural("partys")).toBe("partys");
  });
});