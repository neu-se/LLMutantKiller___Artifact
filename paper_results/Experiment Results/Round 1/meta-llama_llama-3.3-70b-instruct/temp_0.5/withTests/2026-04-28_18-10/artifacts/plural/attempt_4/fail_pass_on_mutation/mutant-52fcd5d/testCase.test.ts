import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should handle words that are the same both singular/plural', () => {
    expect(plural('tropic' + 's')).toBe('tropic' + 's');
  });
});