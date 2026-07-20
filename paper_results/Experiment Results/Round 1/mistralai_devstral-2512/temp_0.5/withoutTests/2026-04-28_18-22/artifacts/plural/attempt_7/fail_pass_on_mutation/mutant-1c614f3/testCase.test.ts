import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly apply string-based rules that return function results", () => {
    // This test specifically targets the mutation by testing a case where:
    // - The rule matches a string ("person")
    // - The result is a string ("people")
    // - The original code checks if result is a Function before calling it
    // - The mutation changes this to check for empty string, which would break this case
    const result = plural("person", 2);
    expect(result).toBe("people");
  });
});