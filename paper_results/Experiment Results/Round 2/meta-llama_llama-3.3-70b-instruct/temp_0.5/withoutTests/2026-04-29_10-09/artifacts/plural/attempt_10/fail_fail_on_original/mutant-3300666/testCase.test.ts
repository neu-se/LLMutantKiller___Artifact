import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should return the correct plural form for a word', () => {
    expect(plural('cat', 2)).toBe('cats');
    expect(plural('cat', 1)).toBe('cat');
    expect(plural('child', 2)).toBe('children');
    expect(plural('child', 1)).toBe('child');
    expect(plural('cactus', 2)).toBe('cacti');
    expect(plural('cactus', 1)).toBe('cactus');
    expect(plural('bus', 2)).toBe('buses');
    expect(plural('bus', 1)).toBe('bus');
    expect(plural('bison', 2)).toBe('bison');
    expect(plural('bison', 1)).toBe('bison');
    const rules = (plural as any).rules;
    expect(rules).toEqual([]);
  });
});