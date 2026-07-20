import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural rule for words ending in x', () => {
  it('should add "es" only to words ending in x, not words containing x elsewhere', () => {
    // "extra" contains 'x' but does not end in 'x'
    // Original: /x$|ch$|s$/i does NOT match "extra" → returns "extras"
    // Mutated:  /x|ch$|s$/i DOES match "extra" (x anywhere) → returns "extraes"
    expect(plural('extra')).toBe('extras');
  });
});