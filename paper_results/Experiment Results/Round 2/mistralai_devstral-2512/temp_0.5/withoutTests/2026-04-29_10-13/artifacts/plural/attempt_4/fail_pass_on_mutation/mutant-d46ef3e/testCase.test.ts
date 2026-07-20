import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'x' but not match partial words", () => {
    expect(plural("box", 2)).toBe("boxes");
    expect(plural("x", 2)).toBe("xes");
    expect(plural("ax", 2)).toBe("axes");
  });
});