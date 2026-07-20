import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function", () => {
  it("should correctly handle string-based rules with function results", () => {
    // This test targets the specific mutation by testing a case where:
    // 1. The rule is a string match ("person")
    // 2. The result is a string ("people")
    // The mutation changes the condition from checking 'Function' to checking empty string
    // which would break the logic for string-based rules
    expect(plural("person")).toBe("people");
  });
});