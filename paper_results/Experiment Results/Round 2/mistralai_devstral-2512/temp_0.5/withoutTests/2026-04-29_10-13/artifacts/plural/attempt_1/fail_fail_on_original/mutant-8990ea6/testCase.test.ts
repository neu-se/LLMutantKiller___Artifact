import plural from "./index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'quy'", () => {
    expect(plural("soliloquy")).toBe("soliloquies");
  });
});