import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle empty string in singular nouns list", () => {
    expect(plural("")).toBe("s");
  });
});