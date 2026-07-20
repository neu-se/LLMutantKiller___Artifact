import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural y-ending words', () => {
  it('should not pluralize words ending in vowel+y by replacing y with ies', () => {
    // "monkey" ends in 'ey' (vowel+y), should become "monkeys" not "monkies"
    // The mutated regex /[^aeiou]y|quy$/i matches "ky" inside "monkey" (no $ anchor)
    // so the mutated code would return "monkies" instead of "monkeys"
    expect(plural('monkey')).toBe('monkeys');
  });
});