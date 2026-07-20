import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending with 'heroic'", () => {
    expect(plural("heroic")).toBe("heroics");
  });
});