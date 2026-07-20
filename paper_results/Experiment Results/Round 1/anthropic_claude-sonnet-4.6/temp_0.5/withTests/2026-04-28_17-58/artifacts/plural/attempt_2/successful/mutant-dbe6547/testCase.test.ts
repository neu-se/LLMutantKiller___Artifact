import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('ics rule with end anchor', () => {
  it('should pluralize a word containing "ics" not at the end by adding s, not return it unchanged', () => {
    // "picsart" contains "ics" but does not end with "ics"
    // Original code uses /ics$/i so it won't match, and the word gets pluralized normally
    // Mutated code uses /ics/i so it matches and returns the word unchanged
    expect(plural('picsart')).toBe('picsarts');
  });
});