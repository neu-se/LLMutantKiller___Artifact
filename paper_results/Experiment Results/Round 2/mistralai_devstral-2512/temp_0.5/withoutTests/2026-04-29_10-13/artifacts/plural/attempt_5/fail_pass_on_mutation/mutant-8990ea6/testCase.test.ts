import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle case-sensitive matching for words ending with 'quy'", () => {
    expect(plural("Soliloquy")).toBe("Soliloquies");
  });
});