import plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe("plural function with string match rule", () => {
  it("should correctly apply string-based rules with non-regex match", () => {
    expect(plural("dwarf")).toBe("dwarfs");
    expect(plural("roof")).toBe("roofs");
  });
});