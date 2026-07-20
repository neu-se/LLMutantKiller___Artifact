import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending with 'x' followed by other characters", () => {
    expect(plural("matrix", 2)).toBe("matrixes");
  });
});