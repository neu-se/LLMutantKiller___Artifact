import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - dwarf exception", () => {
  it("should return 'dwarfs' for 'dwarf' (not 'dwarves')", () => {
    expect(plural("dwarf")).toBe("dwarfs");
  });
});