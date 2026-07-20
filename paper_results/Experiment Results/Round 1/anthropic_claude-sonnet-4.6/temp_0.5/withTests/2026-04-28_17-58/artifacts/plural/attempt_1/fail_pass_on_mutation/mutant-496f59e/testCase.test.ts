import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with string-matched rules", () => {
  it("should correctly pluralize 'criterion' to 'criteria' using string rule matching", () => {
    expect(plural("criterion")).toBe("criteria");
  });
});