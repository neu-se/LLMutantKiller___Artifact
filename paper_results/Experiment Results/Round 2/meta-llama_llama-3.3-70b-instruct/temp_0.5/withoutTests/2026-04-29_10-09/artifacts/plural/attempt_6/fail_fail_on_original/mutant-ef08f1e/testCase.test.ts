import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly pluralize words that end with "o" and are preceded by a vowel', () => {
    expect(plural('folio')).toBe('folios');
    expect(plural('radio')).toBe('radios');
    expect(plural('photo')).toBe('photos');
  });
});