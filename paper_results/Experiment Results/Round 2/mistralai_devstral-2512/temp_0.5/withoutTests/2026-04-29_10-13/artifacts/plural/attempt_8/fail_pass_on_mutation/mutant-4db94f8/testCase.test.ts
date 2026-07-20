import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with string-based rules", () => {
  it("should correctly handle string-based rules when they conflict with regex rules", () => {
    // Test words that have both string and regex rules
    // The string rules should take precedence in the original code
    expect(plural("memo")).toBe("memos");
    expect(plural("cello")).toBe("cellos");

    // Test other string rules to ensure they still work
    expect(plural("criterion")).toBe("criteria");
    expect(plural("bacterium")).toBe("bacteria");
    expect(plural("die")).toBe("dice");
    expect(plural("goose")).toBe("geese");
    expect(plural("mouse")).toBe("mice");
    expect(plural("person")).toBe("people");
    expect(plural("chilli")).toBe("chillies");
  });
});