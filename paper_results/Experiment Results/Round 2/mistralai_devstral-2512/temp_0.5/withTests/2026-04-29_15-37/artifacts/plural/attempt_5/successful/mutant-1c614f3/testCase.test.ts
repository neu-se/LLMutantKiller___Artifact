import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with exact match rules', () => {
  it('should correctly handle exact string match rules that return function results', () => {
    // Add a custom rule that matches exactly and returns a function
    plural.addRule('custom', function(w) { return w + 's'; });
    expect(plural('custom')).toBe('customs');
  });
});