import plural from "./index.js";

describe("plural function", () => {
  it("should return singular form when num is 1", () => {
    expect(plural("apple", 1)).toBe("apple");
  });
});