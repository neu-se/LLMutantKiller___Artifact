import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle words ending with "o" when preceded by a vowel and followed by other characters', () => {
    expect(plural('audio')).toBe('audios');
  });
});