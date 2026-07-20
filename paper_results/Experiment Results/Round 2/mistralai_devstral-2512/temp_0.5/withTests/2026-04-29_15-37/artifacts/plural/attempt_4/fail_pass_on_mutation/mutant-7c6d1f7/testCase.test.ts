import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('pluralization behavior for words ending with o', () => {
  it('should handle words ending with vowel+o differently from consonant+o', () => {
    expect(plural('radio')).toBe('radios');
    expect(plural('hero')).toBe('heroes');
  });
});