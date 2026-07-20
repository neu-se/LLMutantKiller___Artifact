import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural with num argument", () => {
  it("should return the plural form when num is not 1 (e.g., num=2), and return the word unchanged when num is 1", () => {
    // When num !== 1, plural form should be returned
    expect(plural("test", 2)).toBe("tests");
    // When num === 1, the word should be returned as-is (singular)
    expect(plural("test", 1)).toBe("test");
  });
});