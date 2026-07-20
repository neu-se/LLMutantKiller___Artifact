import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize 'bamboo' with 's' instead of 'es'", () => {
    expect(plural("bamboo", 2)).toBe("bamboos");
  });
});