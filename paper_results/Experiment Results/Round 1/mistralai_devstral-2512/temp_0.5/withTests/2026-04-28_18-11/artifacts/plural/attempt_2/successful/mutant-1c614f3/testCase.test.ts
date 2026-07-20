import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with string-based rules', () => {
  it('should correctly handle string-based rules that return a function result', () => {
    // Add a rule that uses a string match with a function result
    plural.addRule('testword', (w) => w.toUpperCase());
    expect(plural('testword')).toBe('TESTWORD');
  });
});