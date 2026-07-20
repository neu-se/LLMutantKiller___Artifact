import plural = require("../../../../../../../../../../../subject_repositories/plural/index.js");

describe("plural function string-based rules", () => {
  it("should correctly apply string-based rules that use non-regex matching", () => {
    // These specific rules are added as direct string matches (not regex)
    // and should trigger the non-regex path in the plural function
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
    expect(plural("zzz")).toBe("zzzs");
  });
});