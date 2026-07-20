import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural - dwarf and roof exception", () => {
  it("should not convert dwarf to dwarves but keep it as dwarfs", () => {
    expect(plural("dwarf")).toBe("dwarfs");
  });
});