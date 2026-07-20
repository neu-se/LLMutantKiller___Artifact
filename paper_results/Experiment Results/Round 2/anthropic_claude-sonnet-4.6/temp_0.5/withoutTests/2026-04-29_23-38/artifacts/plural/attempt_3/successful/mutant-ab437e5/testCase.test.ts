import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize bylaw as bylaws not bylaies', () => {
    // "bylaw" contains consonant+y ("by") but y is not at the end
    // Original regex requires y at end of word, so no match → "bylaws"
    // Mutated regex matches "by" anywhere → removes last char, adds 'ies' → "bylaies"
    expect(plural('bylaw')).toBe('bylaws');
  });
});