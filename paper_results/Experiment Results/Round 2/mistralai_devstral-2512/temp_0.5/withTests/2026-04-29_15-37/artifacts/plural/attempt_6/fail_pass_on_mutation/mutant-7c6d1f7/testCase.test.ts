import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('pluralization of words ending with "o"', () => {
  it('should correctly handle words ending with vowel + o by adding "s"', () => {
    expect(plural('stereo')).toBe('stereos');
    expect(plural('radio')).toBe('radios');
    expect(plural('portfolio')).toBe('portfolios');
  });
});