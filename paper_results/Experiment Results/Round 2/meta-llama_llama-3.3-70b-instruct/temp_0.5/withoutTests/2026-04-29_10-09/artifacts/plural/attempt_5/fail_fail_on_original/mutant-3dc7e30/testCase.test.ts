import plural = require('../../../../../../../../../subject_repositories/plural/index');

describe('plural function', () => {
  it('should return the correct plural form for bacterium', () => {
    expect(plural('bacterium', 2)).not.toBe('');
    expect(plural('bacterium', 2)).not.toBe('bacterium');
  });
});