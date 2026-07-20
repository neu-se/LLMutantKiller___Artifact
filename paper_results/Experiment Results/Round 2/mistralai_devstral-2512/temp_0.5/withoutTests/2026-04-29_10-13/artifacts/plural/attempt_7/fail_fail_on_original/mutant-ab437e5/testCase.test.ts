import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending with 'y' when preceded by a consonant but not at end of string", () => {
    expect(plural("citys")).toBe("cityss");
    expect(plural("babys")).toBe("babyss");
    expect(plural("partys")).toBe("partyss");
  });
});