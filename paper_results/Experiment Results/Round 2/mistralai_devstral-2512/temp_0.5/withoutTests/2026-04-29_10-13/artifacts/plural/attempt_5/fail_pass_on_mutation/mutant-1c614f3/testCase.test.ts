import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle exact match rules with string results", () => {
    expect(plural("criterion")).toBe("criteria");
  });
});