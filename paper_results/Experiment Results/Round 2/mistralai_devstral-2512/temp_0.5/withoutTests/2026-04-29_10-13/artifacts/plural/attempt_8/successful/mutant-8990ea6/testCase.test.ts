import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'quy' but not match partial word endings", () => {
    expect(plural("soliloquy")).toBe("soliloquies");
    expect(plural("quy")).toBe("quies");
    expect(plural("quyot")).toBe("quyots");
  });
});