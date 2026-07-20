import plural from "./index.js";

describe("plural function behavior", () => {
  it("should correctly pluralize 'dwarf' to 'dwarfs'", () => {
    expect(plural("dwarf")).toBe("dwarfs");
  });
});