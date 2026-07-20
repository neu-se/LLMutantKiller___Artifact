import index = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should return the correct plural form for bacterium', () => {
    const result = index(index('bacterium', 2));
    expect(result).not.toBe('');
  });
});