import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe("plural", () => {
  it("should pluralize a word that matches a string rule, not the first regex rule", () => {
    // With mutation, the first rule always fires returning rule[1](word, rule[0])
    // The uncountable rule function returns the word unchanged
    // So 'cat' with mutation returns 'cat' instead of 'cats'
    // Actually need to find what first rule does to a non-matching word
    const result = plural("dog", 2);
    expect(result).toBe("dogs");
  });
});