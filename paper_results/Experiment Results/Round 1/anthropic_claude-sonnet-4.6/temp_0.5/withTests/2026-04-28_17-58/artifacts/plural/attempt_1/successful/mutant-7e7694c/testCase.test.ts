import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural f/fe ending words exception for dwarf and roof", () => {
  it("should pluralize 'dwarf' as 'dwarfs' and 'roof' as 'roofs', not 'dwarves' or 'rooves'", () => {
    expect(plural("dwarf")).toBe("dwarfs");
    expect(plural("roof")).toBe("roofs");
  });
});