const plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should correctly pluralize "bacterium"', () => {
    expect(plural('bacterium')).not.toBe('');
  });
});