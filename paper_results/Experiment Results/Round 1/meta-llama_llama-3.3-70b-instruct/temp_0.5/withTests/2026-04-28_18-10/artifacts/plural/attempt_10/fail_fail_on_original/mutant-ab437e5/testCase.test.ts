import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural', () => {
  it('should handle words that end with a consonant followed by y', () => {
    expect(plural('cry')).toBe('cries');
    expect(plural('try')).toBe('tries');
    expect(plural('fly')).toBe('flies');
    expect(plural('alloy')).toBe('alloys');
    expect(plural('city')).toBe('cities');
    expect(plural('boy')).toBe('boys');
    expect(plural('soliloquy')).toBe('soliloquies');
    expect(plural(' quy')).toBe('quies');
  });
});