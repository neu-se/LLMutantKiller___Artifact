import plural = require('../../../../../../../../../../../subject_repositories/plural/index');

describe('plural function', () => {
  it('should correctly pluralize words that end with x, ch, or s', () => {
    expect(plural('ax')).toBe('axes');
  });
});