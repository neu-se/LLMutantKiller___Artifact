import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('pluralization of words ending with o', () => {
  it('should correctly handle words ending with vowel + o by adding "s"', () => {
    expect(plural('radio')).toBe('radios');
  });
});