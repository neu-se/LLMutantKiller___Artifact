import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly handle words ending with "io"', () => {
    expect(plural('alio', 2)).toBe('alios');
  });
});