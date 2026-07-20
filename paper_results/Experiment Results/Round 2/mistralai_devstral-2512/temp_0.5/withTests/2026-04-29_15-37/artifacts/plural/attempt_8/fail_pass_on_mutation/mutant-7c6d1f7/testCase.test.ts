import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('pluralization of words ending with o', () => {
  it('should add "s" to words ending with vowel + o', () => {
    expect(plural('studio')).toBe('studios');
  });
});