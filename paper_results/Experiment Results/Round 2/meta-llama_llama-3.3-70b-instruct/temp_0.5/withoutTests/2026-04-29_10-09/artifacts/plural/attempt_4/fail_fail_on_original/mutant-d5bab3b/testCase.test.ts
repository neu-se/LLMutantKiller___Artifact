import plural = require('../../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should correctly pluralize "man"', () => {
    expect(plural('man')).toBe('men');
    expect(plural('Man')).toBe('Men');
    expect(plural('woman')).toBe('women');
    expect(plural(' Woman')).toBe(' Women'); 
    expect(plural('man')).not.toBe('man'); // The mutated code will return the same as the input if it's not case-insensitive
  });
});