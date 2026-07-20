import plural from './index.js';

describe('plural function', () => {
  it('should correctly pluralize words that match string rules', () => {
    expect(plural('criterion')).toBe('criteria');
    expect(plural('bacterium')).toBe('bacteria');
    expect(plural('person')).toBe('people');
  });
});