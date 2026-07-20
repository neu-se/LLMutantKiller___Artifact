import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'quy' but not match partial matches", () => {
    expect(plural("soliloquy")).toBe("soliloquies");
    expect(plural("quy")).toBe("quies");
  });
});