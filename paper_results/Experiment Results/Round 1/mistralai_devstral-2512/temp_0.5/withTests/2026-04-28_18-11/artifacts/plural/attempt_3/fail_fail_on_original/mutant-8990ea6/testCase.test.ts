import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with case-insensitive regex", () => {
  it("should correctly pluralize uppercase words ending with 'quy'", () => {
    expect(plural("SOLILOQUY")).toBe("SOLILOQUIES");
  });
});