import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with case-insensitive regex", () => {
  it("should correctly pluralize words ending with 'QUY' regardless of case", () => {
    expect(plural("SOLILOQUY")).toBe("SOLILOQUIES");
    expect(plural("soliloquy")).toBe("soliloquies");
  });
});