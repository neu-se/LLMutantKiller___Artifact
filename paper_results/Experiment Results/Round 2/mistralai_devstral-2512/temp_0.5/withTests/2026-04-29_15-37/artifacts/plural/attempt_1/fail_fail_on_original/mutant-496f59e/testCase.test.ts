import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function behavior with regex rule', () => {
  it('should correctly apply regex-based pluralization rules', () => {
    // This test targets the mutation by using a rule that returns a non-function value
    // The original code checks if rule[1] is a Function, while the mutant always assumes it is
    plural.addRule(/test$/i, 'mutated');

    // The original code will return 'mutated' (non-function case)
    // The mutant will try to call 'mutated' as a function, causing an error
    expect(() => plural('test')).toThrow();
  });
});