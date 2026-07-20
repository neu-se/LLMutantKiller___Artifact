// Jest test file containing exactly one test case
import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural with string key and function rule", () => {
  it("should apply function rules for exact string matches", () => {
    // Add a rule with a string key and a function value
    plural.addRule("testword", function(w: string) { return w + "_plural_result" });
    
    // In original: type(rule[1]) === 'Function' is true, so rule[1](word) is called
    // In mutated: type(rule[1]) === "" is false, so rule[1] (the function itself) is returned
    const result = plural("testword");
    
    // Original returns "testword_plural_result" (function is called)
    // Mutated returns the function itself (not called), which when coerced is not the expected string
    expect(result).toBe("testword_plural_result");
  });
});