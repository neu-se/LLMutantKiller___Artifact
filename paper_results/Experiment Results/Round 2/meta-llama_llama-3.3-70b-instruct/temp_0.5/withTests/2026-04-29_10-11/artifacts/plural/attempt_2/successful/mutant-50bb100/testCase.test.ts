import plural = require('../../../../../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should return the correct plural form for the word "cello"', () => {
    expect(plural('cello')).toBe('cellos');
    expect(plural('')).not.toBe('cellos');
  });
});