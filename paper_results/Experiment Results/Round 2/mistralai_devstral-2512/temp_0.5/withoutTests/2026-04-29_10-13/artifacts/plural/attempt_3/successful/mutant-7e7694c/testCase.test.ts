import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'f' or 'fe' except 'dwarf' and 'roof'", () => {
    expect(plural("knife", 2)).toBe("knives");
    expect(plural("leaf", 2)).toBe("leaves");
    expect(plural("dwarf", 2)).toBe("dwarfs");
    expect(plural("roof", 2)).toBe("roofs");
  });
});