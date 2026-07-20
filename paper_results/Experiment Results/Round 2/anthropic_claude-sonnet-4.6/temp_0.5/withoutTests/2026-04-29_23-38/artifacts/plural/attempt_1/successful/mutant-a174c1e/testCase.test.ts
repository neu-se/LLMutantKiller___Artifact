import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe("plural function with num === 1", () => {
  it("should return the singular word unchanged when num is 1", () => {
    // When num === 1, the original code should return the word as-is (singular)
    // The mutated code (if true) would always pluralize regardless of num
    const result = plural("cat", 1);
    expect(result).toBe("cat");
  });
});