import plural from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural', () => {
  it('should return the correct plural form for a given word', () => {
    expect(plural('cactus', 2)).toBe('cacti');
    expect(plural('cactus', 1)).toBe('cactus');
    expect(plural('cactus')).toBe('cacti');
  });
});