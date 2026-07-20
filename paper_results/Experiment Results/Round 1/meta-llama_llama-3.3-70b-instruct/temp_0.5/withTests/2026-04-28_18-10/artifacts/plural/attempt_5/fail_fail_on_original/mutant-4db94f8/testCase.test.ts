import plural = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural', () => {
  it('should handle string rules correctly', () => {
    expect(plural('man')).toBe('men');
    expect(plural('woman')).toBe('women');
    expect(plural('person')).toBe('people');
    expect(plural('cactus')).toBe('cacti');
    expect(plural('cactus', 1)).toBe('cactus');
  });
});