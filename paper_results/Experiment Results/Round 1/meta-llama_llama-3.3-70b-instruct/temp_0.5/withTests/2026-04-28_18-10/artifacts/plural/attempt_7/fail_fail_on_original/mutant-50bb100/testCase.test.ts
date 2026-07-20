import plural = require('../../../../subject_repositories/plural/index.js');

describe('plural', () => {
  it('should correctly pluralize the word "cello"', () => {
    expect(plural('cello')).toBe('cellos');
    expect(plural('foo')).not.toBe('cellos');
  });
});