import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should correctly pluralize words that end with "io"', () => {
    expect(plural('alio', 2)).toBe('alios');
  });
});