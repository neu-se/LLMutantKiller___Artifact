import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending in 's' when they appear in the misc list", () => {
    expect(plural("odd")).toBe("odds");
  });
});