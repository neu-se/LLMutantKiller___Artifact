import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('pluralization of words ending with o', () => {
  it('should add "es" to words ending with consonant + o', () => {
    expect(plural('hero')).toBe('heroes');
  });
});