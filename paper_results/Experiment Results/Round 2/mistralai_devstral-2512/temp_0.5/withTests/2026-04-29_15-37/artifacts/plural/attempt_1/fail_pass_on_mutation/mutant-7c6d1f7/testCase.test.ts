import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('pluralization of words ending with vowel + o', () => {
  it('should correctly pluralize words ending with vowel + o by adding "s"', () => {
    expect(plural('stereo')).toBe('stereos');
    expect(plural('radio')).toBe('radios');
    expect(plural('studio')).toBe('studios');
    expect(plural('portfolio')).toBe('portfolios');
    expect(plural('bamboo')).toBe('bamboos');
  });
});