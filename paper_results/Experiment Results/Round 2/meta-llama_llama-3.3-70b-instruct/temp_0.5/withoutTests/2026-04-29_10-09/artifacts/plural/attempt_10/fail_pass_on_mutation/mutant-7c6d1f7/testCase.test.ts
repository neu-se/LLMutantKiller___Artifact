import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly handle words ending with "io"', () => {
    expect(plural('ratio', 2)).toBe('ratios');
  });
});