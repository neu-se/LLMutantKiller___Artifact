import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize 'curio' with 's' instead of 'es'", () => {
    expect(plural("curio", 2)).toBe("curios");
  });
});