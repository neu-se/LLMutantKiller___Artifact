import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly handle words ending with "io"', () => {
    expect(plural('folio', 2)).toBe('folios');
    expect(plural('studio', 2)).toBe('studios');
  });
});