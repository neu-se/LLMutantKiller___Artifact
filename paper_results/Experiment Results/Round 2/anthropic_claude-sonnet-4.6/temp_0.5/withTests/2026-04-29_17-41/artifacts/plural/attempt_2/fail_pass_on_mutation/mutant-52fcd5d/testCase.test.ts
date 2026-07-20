import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural misc array behavior', () => {
  it('should pluralize "tropics" correctly as a word ending in -ics', () => {
    // In the original code, 'tropic' is in misc array so 'tropics' -> 'tropics'
    // In the mutated code, 'tropic' is replaced with "", creating \b(?:...|)s\b
    // which matches any word ending in 's', so plural('dogs') returns 'dogs' instead of 'dogses'
    expect(plural('dogs')).toBe('dogses');
  });
});