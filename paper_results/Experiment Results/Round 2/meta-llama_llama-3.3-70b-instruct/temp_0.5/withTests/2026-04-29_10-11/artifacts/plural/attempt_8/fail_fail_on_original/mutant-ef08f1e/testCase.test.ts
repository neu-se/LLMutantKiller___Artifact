import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should handle words that end with "io" correctly', () => {
    expect(plural('folio')).toBe('folios');
    expect(plural('photo')).toBe('photoes');
    expect(plural('radio')).toBe('radios');
    expect(plural('atio')).toBe('ations'); 
  });
});