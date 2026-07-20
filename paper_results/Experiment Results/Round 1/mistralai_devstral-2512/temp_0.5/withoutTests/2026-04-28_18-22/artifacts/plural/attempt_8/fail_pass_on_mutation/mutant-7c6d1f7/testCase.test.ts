import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize 'studio' with 's' instead of 'es'", () => {
    expect(plural("studio", 2)).toBe("studios");
  });
});