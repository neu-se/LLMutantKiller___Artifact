import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with mixed rule types", () => {
  it("should correctly distinguish between function and non-function rules", () => {
    // Add a non-function rule
    plural.addRule("special", "specials");

    // Add a function rule that would behave differently
    plural.addRule("unique", function(w) {
      return w + "s";
    });

    // Test the non-function rule
    expect(plural("special")).toBe("specials");

    // Test the function rule
    expect(plural("unique")).toBe("uniques");
  });
});