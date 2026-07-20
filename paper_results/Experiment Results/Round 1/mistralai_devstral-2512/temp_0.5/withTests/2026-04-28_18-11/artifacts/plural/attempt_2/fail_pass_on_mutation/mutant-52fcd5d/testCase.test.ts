import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function behavior with empty string in misc array", () => {
  it("should correctly handle the word 'tropic' when empty string is in misc array", () => {
    // The mutation adds an empty string to the misc array which affects the regex pattern
    // This test checks that 'tropic' is still correctly pluralized as 'tropics'
    // The mutated code will fail because the empty string in the regex will cause incorrect matching
    const result = plural("tropic");
    expect(result).toBe("tropics");
  });
});