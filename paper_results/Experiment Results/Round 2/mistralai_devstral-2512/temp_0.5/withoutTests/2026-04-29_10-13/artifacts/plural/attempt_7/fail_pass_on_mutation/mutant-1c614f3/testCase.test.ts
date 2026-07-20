import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle exact match rules with function results for irregular plurals", () => {
    expect(plural("woman")).toBe("women");
  });
});