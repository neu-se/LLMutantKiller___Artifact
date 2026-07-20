import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should not apply y-ending rule to words where y is not at the end', () => {
    // "player" contains consonant+y but y is NOT at the end of the word
    // Original regex /[^aeiou]y$|quy$/i requires y to be at end of word
    // Mutated regex /[^aeiou]y|quy$/i matches y anywhere in word
    // Original should return "players" (default +s rule)
    // Mutated would incorrectly return "plaies" (removes last char, adds 'ies')
    expect(plural('player')).toBe('players');
  });
});