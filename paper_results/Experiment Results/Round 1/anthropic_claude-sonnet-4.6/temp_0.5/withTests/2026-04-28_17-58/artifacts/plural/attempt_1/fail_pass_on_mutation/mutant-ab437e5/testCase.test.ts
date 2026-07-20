import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural rule for words ending in consonant+y', () => {
  it('should not apply the consonant+y rule to words where y is not at the end', () => {
    // "player" contains consonant+y but y is NOT at the end of the word
    // Original regex /[^aeiou]y$|quy$/i requires y to be at the END
    // Mutated regex /[^aeiou]y|quy$/i matches consonant+y ANYWHERE in the word
    // So with the mutation, "player" would incorrectly become "plaies" instead of "players"
    expect(plural('player')).toBe('players');
  });
});