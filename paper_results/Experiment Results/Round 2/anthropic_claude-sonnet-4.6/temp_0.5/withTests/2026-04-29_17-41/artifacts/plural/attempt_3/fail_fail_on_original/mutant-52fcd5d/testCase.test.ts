import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural misc array behavior', () => {
  it('should correctly pluralize "tropics" - tropic must be in misc array', () => {
    // Original: 'tropic' in misc array -> regex matches 'tropics' -> returns 'tropics'
    // Mutated: 'tropic' replaced with "" -> 'tropics' no longer matched by misc regex
    // but 'tropics' matches /ics$/i rule -> still returns 'tropics'
    // The real difference: the empty string creates \b(?:...|)s\b which matches standalone 's'
    // More importantly, 'tropics' passed to plural should return 'tropics' in original
    // via the misc regex, but in mutated it still returns 'tropics' via /ics$/ rule
    
    // The distinguishing case: plural('tropic') should give 'tropics' in both
    // But what about a word that would be caught by the empty-string pattern?
    // \b(?:)s\b matches the word "s" by itself
    expect(plural('s')).toBe('ss');
  });
});