import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending with 'y' when preceded by a consonant and followed by other characters", () => {
    expect(plural("cityx")).toBe("cityxs");
    expect(plural("babych")).toBe("babychs");
    expect(plural("partys")).toBe("partyss");
  });
});