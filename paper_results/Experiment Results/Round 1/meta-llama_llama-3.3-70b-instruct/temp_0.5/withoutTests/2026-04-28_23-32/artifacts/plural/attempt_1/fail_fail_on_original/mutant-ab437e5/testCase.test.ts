import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words that end in a consonant followed by y', () => {
    expect(plural('city')).toBe('cities');
    expect(plural('fly')).toBe('flies');
    expect(plural('baby')).toBe('babies');
    expect(plural('soliloquy')).toBe('soliloquies');
  });
});