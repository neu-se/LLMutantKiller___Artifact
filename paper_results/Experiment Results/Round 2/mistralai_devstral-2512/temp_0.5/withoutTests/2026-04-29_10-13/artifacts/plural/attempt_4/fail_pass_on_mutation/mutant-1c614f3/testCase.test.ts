import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle exact match rules with function results", () => {
    const result = plural("man");
    expect(result).toBe("men");
  });
});