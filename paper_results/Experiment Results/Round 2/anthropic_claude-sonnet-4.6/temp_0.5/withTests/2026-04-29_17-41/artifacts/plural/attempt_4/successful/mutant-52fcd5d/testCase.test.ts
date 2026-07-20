import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural misc array behavior', () => {
  it('should return ses for the word s (ends in s rule applies)', () => {
    // The misc rule is added after /s$/ rule, giving it higher priority
    // In mutated code, empty string "" creates \b(?:...|)s\b which matches standalone 's'
    // So plural('s') would return 's' in mutated (misc rule catches it)
    // In original, 's' is not in misc pattern, so /s$/ rule applies -> 'ses'
    expect(plural('s')).toBe('ses');
  });
});