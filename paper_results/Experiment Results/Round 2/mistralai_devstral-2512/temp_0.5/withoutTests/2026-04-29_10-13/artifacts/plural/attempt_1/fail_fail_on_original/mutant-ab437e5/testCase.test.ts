import plural from "./index.js";

describe("plural function", () => {
  it("should correctly pluralize words ending with 'y' preceded by a consonant", () => {
    expect(plural("city")).toBe("cities");
    expect(plural("baby")).toBe("babies");
    expect(plural("party")).toBe("parties");
  });
});