import plural from "./index.js";

describe("plural function", () => {
  it("should pluralize words correctly when num is 1", () => {
    expect(plural("cat", 1)).toBe("cat");
    expect(plural("dog", 1)).toBe("dog");
    expect(plural("house", 1)).toBe("house");
  });
});