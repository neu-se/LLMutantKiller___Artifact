import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle exact match rules with function results for words ending in 'man'", () => {
    const testCases = [
      { input: "woman", expected: "women" },
      { input: "man", expected: "men" },
      { input: "Woman", expected: "Women" },
      { input: "Man", expected: "Men" }
    ];

    testCases.forEach(({ input, expected }) => {
      expect(plural(input)).toBe(expected);
    });
  });
});