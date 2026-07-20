import plural from "./index.js";

describe("plural function with case-insensitive regex", () => {
  it("should correctly pluralize words ending with 'quy' regardless of case", () => {
    expect(plural("soliloquy")).toBe("soliloquies");
    expect(plural("Soliloquy")).toBe("Soliloquies");
    expect(plural("SOLILOQUY")).toBe("SOLILOQUIES");
  });
});