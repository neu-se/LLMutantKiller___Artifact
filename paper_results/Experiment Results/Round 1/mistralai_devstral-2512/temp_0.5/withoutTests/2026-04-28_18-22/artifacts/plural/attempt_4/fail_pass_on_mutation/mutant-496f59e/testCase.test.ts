import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with function rule", () => {
  it("should correctly apply function-based rules with regex match", () => {
    // Add a function-based rule that uses the regex match parameter
    plural.addRule(/[^aeiou]y$/i, function(w, match) {
      if (match) {
        return w.substr(0, w.length - 1) + 'ies';
      }
      return w + 's';
    });

    // Test with a word that should trigger the regex match
    const result = plural("berry");
    expect(result).toBe("berries");
  });
});