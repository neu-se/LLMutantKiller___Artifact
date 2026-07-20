import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle words ending with 'x' at word boundary", () => {
    expect(plural("box", 2)).toBe("boxes");
    expect(plural("x-ray", 2)).toBe("x-rays");
  });
});