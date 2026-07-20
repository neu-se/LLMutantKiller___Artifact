import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with string-based rules", () => {
  it("should correctly prioritize string-based rules over regex rules", () => {
    // Test a word that matches both a string rule and a regex rule
    // The string rule should take precedence in the original code
    expect(plural("memo")).toBe("memos");
    expect(plural("cello")).toBe("cellos");

    // Test words that only match string rules
    expect(plural("criterion")).toBe("criteria");
    expect(plural("bacterium")).toBe("bacteria");
    expect(plural("die")).toBe("dice");
    expect(plural("goose")).toBe("geese");
    expect(plural("mouse")).toBe("mice");
    expect(plural("person")).toBe("people");
    expect(plural("chilli")).toBe("chillies");
  });
});