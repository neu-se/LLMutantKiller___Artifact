import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize 'ratio' with 's' instead of 'es'", () => {
    expect(plural("ratio", 2)).toBe("ratios");
  });
});