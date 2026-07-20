import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should not pluralize words ending with 'ay' as if they end with 'y'", () => {
    expect(plural("tray", 2)).toBe("trays");
  });
});