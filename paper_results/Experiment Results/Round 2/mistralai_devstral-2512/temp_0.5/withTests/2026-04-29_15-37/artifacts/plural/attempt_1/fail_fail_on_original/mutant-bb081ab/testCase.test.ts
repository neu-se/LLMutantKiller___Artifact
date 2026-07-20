import plural from "./index.js";

describe("plural function with string match rule", () => {
  it("should correctly apply string-based rules", () => {
    expect(plural("criterion")).toBe("criteria");
    expect(plural("bacterium")).toBe("bacteria");
    expect(plural("memo")).toBe("memos");
  });
});