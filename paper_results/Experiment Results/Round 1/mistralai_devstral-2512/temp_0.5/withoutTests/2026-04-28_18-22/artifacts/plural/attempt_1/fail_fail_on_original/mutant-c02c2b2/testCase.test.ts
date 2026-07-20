import plural from "./index.js";

describe("plural function", () => {
  it("should return singular form when num is 1", () => {
    const result = plural("cat", 1);
    expect(result).toBe("cat");
  });
});