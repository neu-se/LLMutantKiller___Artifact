import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with regex rule", () => {
  it("should correctly apply regex rules when rule is a function", () => {
    // Test with a word that matches a regex rule (ends with 's')
    const result = plural("bus");
    expect(result).toBe("buses");
  });
});