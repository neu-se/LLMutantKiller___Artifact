import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with case-insensitive regex", () => {
  it("should correctly pluralize words ending with 'quy' in mixed case", () => {
    expect(plural("Soliloquy")).toBe("Soliloquies");
  });
});