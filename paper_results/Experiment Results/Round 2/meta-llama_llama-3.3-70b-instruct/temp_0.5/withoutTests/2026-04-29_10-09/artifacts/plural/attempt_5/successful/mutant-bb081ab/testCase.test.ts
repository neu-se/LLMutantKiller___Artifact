import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for a custom rule', () => {
    const originalRule = plural.addRule;
    plural.addRule('custom', function(w) { return w + 's' });
    expect(plural('custom')).toBe('customs');
    plural.addRule = originalRule;
  });
});