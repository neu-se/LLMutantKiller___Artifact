import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize 'box' but not 'x'", () => {
    expect(plural("box", 2)).toBe("boxes");
    expect(plural("x", 2)).toBe("xs");
  });
});