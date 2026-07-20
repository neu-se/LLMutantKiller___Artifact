import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural string rules via addRule', () => {
  it('should apply a custom string rule added via addRule for a word matching no regex rules', () => {
    // Add a rule for a unique word that won't match any existing regex rules
    plural.addRule('xyzzyword', 'xyzzywords_plural');
    // In original: string rule check works independently of regex block -> returns 'xyzzywords_plural'
    // In mutated: string rule check is inside regex block (unreachable) -> returns 'xyzzywords'
    expect(plural('xyzzyword')).toBe('xyzzywords_plural');
  });
});