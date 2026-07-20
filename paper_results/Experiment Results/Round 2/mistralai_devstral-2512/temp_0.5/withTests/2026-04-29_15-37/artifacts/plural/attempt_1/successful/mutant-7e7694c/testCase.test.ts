import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("pluralization of words ending in 'f' or 'fe'", () => {
  it("should correctly pluralize 'dwarf' to 'dwarfs'", () => {
    expect(plural("dwarf")).toBe("dwarfs");
  });
});