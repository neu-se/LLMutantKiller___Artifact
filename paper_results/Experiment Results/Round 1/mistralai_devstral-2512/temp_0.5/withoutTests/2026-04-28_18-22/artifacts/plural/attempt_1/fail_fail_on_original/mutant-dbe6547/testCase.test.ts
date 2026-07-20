import plural from "./index.js";

describe("plural function", () => {
  it("should handle words ending with 'ics' correctly", () => {
    expect(plural("physics", 2)).toBe("physics");
    expect(plural("economics", 2)).toBe("economics");
    expect(plural("mathematics", 2)).toBe("mathematics");
    expect(plural("politics", 2)).toBe("politics");
    expect(plural("ethics", 2)).toBe("ethics");
  });
});