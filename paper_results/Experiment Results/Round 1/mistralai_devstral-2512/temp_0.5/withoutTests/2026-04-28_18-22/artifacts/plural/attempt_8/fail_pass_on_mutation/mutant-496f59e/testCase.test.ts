import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural function with function rule", () => {
  it("should correctly handle function rules that check parameter types", () => {
    // Add a rule that will only work correctly if the type check is present
    plural.addRule(/test$/i, function(w, match) {
      if (typeof match === 'object') {
        return w.replace(match, 'tests');
      }
      return w + 's';
    });

    const result = plural("test");
    expect(result).toBe("tests");
  });
});