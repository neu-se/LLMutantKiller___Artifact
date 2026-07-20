import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should correctly pluralize words that end with "eo"', () => {
    expect(plural('video', 2)).toBe('videos');
  });
});