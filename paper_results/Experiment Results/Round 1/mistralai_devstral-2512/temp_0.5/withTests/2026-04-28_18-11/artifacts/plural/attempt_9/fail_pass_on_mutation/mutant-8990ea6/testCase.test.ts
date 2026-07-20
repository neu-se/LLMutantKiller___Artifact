import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with case-insensitive regex", () => {
  it("should correctly pluralize words ending with 'QUY' in uppercase", () => {
    expect(plural("SOLILOQUY")).toBe("SOLILOQUies");
  });
});