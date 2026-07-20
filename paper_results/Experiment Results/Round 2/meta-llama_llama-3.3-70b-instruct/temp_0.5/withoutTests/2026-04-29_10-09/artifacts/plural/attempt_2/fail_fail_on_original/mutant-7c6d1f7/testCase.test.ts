import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly handle words ending with "io"', () => {
    expect(plural('photo', 2)).toBe('photos');
    expect(plural('video', 2)).toBe('videos');
    expect(plural('alio', 2)).toBe('alios');
  });
});