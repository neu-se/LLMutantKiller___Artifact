import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should return the correct plural form for the word "cello"', () => {
    expect(plural("cello", 2)).toBe('cellos');
    expect(plural("", 2)).not.toBe('cellos');
  });
});