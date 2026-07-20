import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly handle words ending with "io"', () => {
    expect(plural('radio', 2)).toBe('radios');
  });
});