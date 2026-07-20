import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('pluralization of words ending with vowel + o', () => {
  it('should add "s" for words ending with vowel + o', () => {
    expect(plural('stereo')).toBe('stereos');
  });
});