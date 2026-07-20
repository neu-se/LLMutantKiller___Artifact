import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly pluralize words that end with "o" and are preceded by a consonant', () => {
    expect(plural('photo')).toBe('photos');
    expect(plural('tomato')).toBe('tomatoes');
    expect(plural('hero')).toBe('heroes');
  });
});