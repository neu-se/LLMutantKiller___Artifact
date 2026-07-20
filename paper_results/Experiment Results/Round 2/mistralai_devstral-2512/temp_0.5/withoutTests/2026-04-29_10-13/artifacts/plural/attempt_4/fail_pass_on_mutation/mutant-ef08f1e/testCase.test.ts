import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending with 'eo' followed by other characters", () => {
    expect(plural("stereotype", 2)).toBe("stereotypes");
  });
});