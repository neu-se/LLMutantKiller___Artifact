import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle exact match rules with function results", () => {
    expect(plural("man")).toBe("men");
  });
});