import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'quy' regardless of case", () => {
    expect(plural("soliloquy")).toBe("soliloquies");
    expect(plural("SOLILOQUY")).toBe("SOLILOQUIES");
    expect(plural("Soliloquy")).toBe("Soliloquies");
  });
});