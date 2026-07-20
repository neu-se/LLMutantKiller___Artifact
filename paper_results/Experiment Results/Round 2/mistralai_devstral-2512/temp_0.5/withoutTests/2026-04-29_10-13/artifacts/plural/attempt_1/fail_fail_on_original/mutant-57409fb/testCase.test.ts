import plural from "./index.js";

describe("plural function with num parameter", () => {
  it("should return singular form when num is 1", () => {
    const result = plural("child", 1);
    expect(result).toBe("child");
  });
});