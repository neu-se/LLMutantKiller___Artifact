import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with case-insensitive regex", () => {
  it("should correctly handle uppercase words ending with 'QUY'", () => {
    expect(plural("SOLILOQUY")).toBe("SOLILOQUies");
  });
});