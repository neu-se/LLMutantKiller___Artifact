import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize 'portfolio' with 's' instead of 'es'", () => {
    expect(plural("portfolio", 2)).toBe("portfolios");
  });
});