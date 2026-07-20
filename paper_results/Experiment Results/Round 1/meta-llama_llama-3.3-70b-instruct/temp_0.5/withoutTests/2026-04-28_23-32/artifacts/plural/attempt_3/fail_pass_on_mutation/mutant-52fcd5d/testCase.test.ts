import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should handle words that end with riche correctly', () => {
    expect(plural('riche', 2)).toBe('riches');
  });
});