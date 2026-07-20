import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with 'dwarf' input", () => {
  it("should return 'dwarfs' for the word 'dwarf'", () => {
    expect(plural("dwarf")).toBe("dwarfs");
  });
});