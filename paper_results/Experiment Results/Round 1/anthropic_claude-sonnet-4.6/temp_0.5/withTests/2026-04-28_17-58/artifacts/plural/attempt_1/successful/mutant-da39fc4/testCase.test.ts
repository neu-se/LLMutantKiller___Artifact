import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - dwarf exception for f/fe rule", () => {
  it("should return 'dwarfs' for 'dwarf' (not 'dwarves')", () => {
    expect(plural("dwarf")).toBe("dwarfs");
  });
});