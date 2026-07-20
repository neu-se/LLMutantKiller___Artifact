import { plural } from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural', () => {
  it('should handle words that end with a consonant followed by y', () => {
    expect(plural('fly')).toBe('flies');
    expect(plural('city')).toBe('cities');
    expect(plural('soliloquy')).toBe('soliloquies');
    expect(plural('try')).toBe('tries');
  });
});