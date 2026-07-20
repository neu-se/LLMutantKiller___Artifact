import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural', () => {
  it('should handle words that end with a consonant followed by y', () => {
    expect(plural('boy')).toBe('boys');
    expect(plural('alloy')).toBe('alloys');
  });
});