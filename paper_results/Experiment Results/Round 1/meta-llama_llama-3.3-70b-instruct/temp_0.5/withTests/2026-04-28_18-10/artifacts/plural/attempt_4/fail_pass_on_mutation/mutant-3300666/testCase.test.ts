import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly handle empty string input', () => {
    expect(plural('')).toBe('s');
  });
});