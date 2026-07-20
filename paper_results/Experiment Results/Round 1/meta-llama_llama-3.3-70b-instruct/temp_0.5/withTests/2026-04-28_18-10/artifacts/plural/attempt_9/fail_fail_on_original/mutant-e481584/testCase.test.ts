const plural = require('../../../../../../../subject_repositories/plural/index.js');

describe('plural function', () => {
  it('should return "cellos" for the word "cello"', () => {
    expect(plural('cello')).toBe('cellos');
  });
});