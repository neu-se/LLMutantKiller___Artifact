import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should not match 'x' in the middle of words for the x$ rule", () => {
    expect(plural("example", 2)).toBe("examples");
    expect(plural("exact", 2)).toBe("exacts");
    expect(plural("ex", 2)).toBe("exes");
  });
});