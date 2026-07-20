import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should not apply the 'y' rule to words ending with 'ay'", () => {
    expect(plural("tray", 2)).toBe("trays");
  });
});