import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should correctly pluralize words that end with "o"', () => {
    expect(plural('photo')).toBe('photos');
    expect(plural('folio')).toBe('folios');
    expect(plural('radio')).toBe('radios');
    expect(plural('video')).toBe('videos');
  });
});