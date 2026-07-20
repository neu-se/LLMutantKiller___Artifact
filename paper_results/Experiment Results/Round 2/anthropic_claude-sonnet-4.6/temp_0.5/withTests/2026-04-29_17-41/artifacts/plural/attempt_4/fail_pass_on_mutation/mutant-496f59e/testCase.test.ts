import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should return singular form when num is 1", () => {
    // When num === 1, plural should return the word unchanged
    expect(plural("test", 1)).toBe("test");
  });
});