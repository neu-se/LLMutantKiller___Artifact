import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'QUY' in uppercase", () => {
    expect(plural("SOLILOQUY")).toBe("SOLILOQUIES");
  });
});