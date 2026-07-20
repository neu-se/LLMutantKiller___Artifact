import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle empty string in misc words list", () => {
    expect(plural("")).toBe("s");
  });
});