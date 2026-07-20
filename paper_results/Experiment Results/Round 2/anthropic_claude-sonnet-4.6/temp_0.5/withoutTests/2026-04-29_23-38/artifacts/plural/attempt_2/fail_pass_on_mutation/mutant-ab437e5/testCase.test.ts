import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize monkey as monkeys not monkies', () => {
    // "monkey" ends in vowel+y (ey), so the y-consonant rule should NOT apply
    // Original regex /[^aeiou]y$/ requires consonant immediately before y at end
    // Mutated regex /[^aeiou]y/ matches "ky" anywhere in "monkey"
    // Original: no match on y-rule, falls through to default → "monkeys"  
    // Mutated: matches "ky" in "monkey", returns "monkies"
    expect(plural('monkey')).toBe('monkeys');
  });
});