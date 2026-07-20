import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly pluralize words with specific rules', () => {
    expect(plural('photo')).toBe('photos');
    expect(plural('folio')).toBe('folios');
    expect(plural('video')).toBe('videos');
  });
});