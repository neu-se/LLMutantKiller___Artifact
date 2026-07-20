import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with function rule", () => {
  it("should correctly handle function rules that return different types", () => {
    // Add a function rule that returns a string
    plural.addRule("test", function() {
      return "tested";
    });

    // Test with the exact word that matches the rule
    const result = plural("test");
    expect(result).toBe("tested");
  });
});