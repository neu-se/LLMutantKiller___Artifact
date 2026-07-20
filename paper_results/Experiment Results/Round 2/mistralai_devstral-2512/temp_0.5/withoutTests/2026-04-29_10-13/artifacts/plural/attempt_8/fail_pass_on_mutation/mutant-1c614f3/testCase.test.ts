import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle exact match rules with function results for words ending in 'man'", () => {
    expect(plural("woman")).toBe("women");
    expect(plural("man")).toBe("men");
  });
});