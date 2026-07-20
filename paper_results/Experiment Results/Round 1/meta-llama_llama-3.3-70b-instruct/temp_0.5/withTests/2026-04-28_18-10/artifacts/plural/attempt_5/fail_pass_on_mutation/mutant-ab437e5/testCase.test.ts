import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural', () => {
  it('should handle words that end with a consonant followed by y', () => {
    expect(plural('try')).toBe('tries');
    expect(plural('cry')).toBe('cries');
    expect(plural('fly')).toBe('flies');
    expect(plural('boy')).toBe('boys');
  });
});