import plural = require('../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should return a non-empty string for the word "cello"', () => {
    expect(plural('cello')).not.toBe('');
  });
});