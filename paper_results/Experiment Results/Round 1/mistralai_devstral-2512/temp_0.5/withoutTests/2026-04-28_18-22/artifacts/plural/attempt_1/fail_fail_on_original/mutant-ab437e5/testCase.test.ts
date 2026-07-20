import plural from "./index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'ay'", () => {
    expect(plural("tray", 2)).toBe("trays");
  });
});