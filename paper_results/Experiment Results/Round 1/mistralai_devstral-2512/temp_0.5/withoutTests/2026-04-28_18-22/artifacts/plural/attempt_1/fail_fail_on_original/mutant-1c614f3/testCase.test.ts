import plural from "./index.js";

describe("plural function", () => {
  it("should correctly pluralize words with string-based rules", () => {
    expect(plural("criterion")).toBe("criteria");
    expect(plural("bacterium")).toBe("bacteria");
    expect(plural("memo")).toBe("memos");
    expect(plural("goose")).toBe("geese");
    expect(plural("mouse")).toBe("mice");
    expect(plural("person")).toBe("people");
    expect(plural("chilli")).toBe("chillies");
  });
});