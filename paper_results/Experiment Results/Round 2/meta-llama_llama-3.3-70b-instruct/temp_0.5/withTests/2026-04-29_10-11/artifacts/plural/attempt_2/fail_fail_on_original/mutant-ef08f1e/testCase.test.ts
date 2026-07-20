import { plural } from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should handle words that end with "io" correctly', () => {
    expect(plural('photo')).toBe('photos');
    expect(plural('radio')).toBe('radios');
    expect(plural('folio')).toBe('folios');
  });
});