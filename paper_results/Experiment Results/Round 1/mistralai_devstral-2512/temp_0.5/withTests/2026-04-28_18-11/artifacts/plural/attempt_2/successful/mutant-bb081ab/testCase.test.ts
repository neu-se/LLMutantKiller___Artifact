import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function behavior with non-regex rules', () => {
  it('should correctly handle string-based rules with function results', () => {
    // Add a string-based rule with a function result that will trigger the mutated code path
    plural.addRule('test', (w: string) => w + 's');
    // The mutation changes the behavior when rule[0] is not a RegExp and rule[1] is a Function
    // This test ensures the function-based rule is processed correctly
    expect(plural('test')).toBe('tests');
  });
});