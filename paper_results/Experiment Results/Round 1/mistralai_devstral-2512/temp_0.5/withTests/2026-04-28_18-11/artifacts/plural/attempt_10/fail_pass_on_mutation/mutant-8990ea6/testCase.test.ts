import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with case-insensitive regex", () => {
  it("should handle uppercase 'QUY' ending words correctly", () => {
    expect(plural("SOLILOQUY")).toBe("SOLILOQUies");
  });
});