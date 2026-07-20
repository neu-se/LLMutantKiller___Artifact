const index = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural function', () => {
  it('should return the correct plural form for bacterium', () => {
    expect(index('bacterium', 2)).toBe('bacteria');
  });
});