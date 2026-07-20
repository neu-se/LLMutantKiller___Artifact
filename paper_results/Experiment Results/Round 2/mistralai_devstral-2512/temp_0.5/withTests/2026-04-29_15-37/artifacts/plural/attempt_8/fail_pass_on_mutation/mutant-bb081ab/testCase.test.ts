import plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe("plural function with string match rule", () => {
  it("should correctly apply string-based rules that are not regex patterns", () => {
    // Test string-based rules that should trigger the non-regex path
    expect(plural("criterion")).toBe("criteria");
    expect(plural("bacterium")).toBe("bacteria");
    expect(plural("memo")).toBe("memos");
    expect(plural("cello")).toBe("cellos");
    expect(plural("die")).toBe("dice");
    expect(plural("goose")).toBe("geese");
    expect(plural("mouse")).toBe("mice");
    expect(plural("person")).toBe("people");
    expect(plural("chilli")).toBe("chillies");
    expect(plural("man")).toBe("men");
    expect(plural("woman")).toBe("women");
    expect(plural("human")).toBe("humans");
    expect(plural("dwarf")).toBe("dwarfs");
    expect(plural("roof")).toBe("roofs");
  });
});